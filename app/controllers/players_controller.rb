class PlayersController < ApplicationController
  include ActionController::Cookies

  def login_player(player)
    player.update(logged_in: true)
    session[:player_id] = player.id
    cookies.signed[:player_id] = player.id
  end
  
  def render_player(player)
    serialized_data = PlayerSerializer.new(player).to_serialized_json
    render json: serialized_data
  end
  
  def broadcast_player(player)
    serialized_data = PlayerSerializer.new(player).to_serialized_json
    render json: serialized_data
    ActionCable.server.broadcast "players_channel", serialized_data
  end
  
  def index
    logged_in_players = Player.all.where(logged_in: true)
    render_player(logged_in_players)
  end
  
  def create
    shortened_name = params[:name].slice(0, 10)
    player = Player.find_by(name: shortened_name)
    if player
      if player.authenticate(params[:password])
        login_player(player)
        broadcast_player(player)
      else
        error = {wrong: ["password or player taken"]}
        render json: {errors: error}, status: 422
      end
    else
      player = Player.create(name: shortened_name, password: params[:password])
      if player.errors.messages.keys.length > 0
        render json: {errors: player.errors.messages}, status: 422
      else
        login_player(player)
        broadcast_player(player)
      end
    end
  end

  def get_current_player
    if logged_in?
      login_player(current_player)
      broadcast_player(current_player)
    else
      render json: {error: "no user logged in"}, status: 422
    end
  end

  def destroy
    player = Player.find(params[:id])
    player.update(logged_in: false)
    broadcast_player(player)
    session.clear
  end

  def scoreboard
    players = Player.all
    players_by_wins = players.sort_by { |player| player.wins }
    player_by_wins_desc = players_by_wins.reverse
    render_player(player_by_wins_desc)
  end

  def challenge
    player = Player.find(params[:player_id])
    RequestsChannel.broadcast_to player, {challenger_id: current_player.id}.to_json
    render json: {message: "challenge sent"}
  end

  def decline_request
    challenger = Player.find(params[:challenger_id])
    ChallengesChannel.broadcast_to challenger, {decline: true}.to_json
  end
end
