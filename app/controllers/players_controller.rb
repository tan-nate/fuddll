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
    players = Player.all
    logged_in_players = players.where(logged_in: true)
    render_player(players)
  end
  
  def create
    player = Player.find_by(name: params[:name])
    if player
      if player.authenticate(params[:password])
        login_player(player)
        broadcast_player(player)
      else
        render json: {error: "incorrect password. check password or create new user"}, status: 422
      end
    else
      player = Player.create(name: params[:name], password: params[:password])
      login_player(player)
    end
  end

  def get_current_player
    if logged_in?
      broadcast_player(current_player)
    else
      render json: {error: "no user logged in"}, status: 422
    end
  end

  def destroy
    player = Player.find(params[:id])
    player.update(logged_in: false)
    session.clear
  end
end
