class PlayersController < ApplicationController
  def index
    players = Player.all
    logged_in_players = players.where(logged_in: true)
    serialized_data = PlayerSerializer.new(logged_in_players).to_serialized_json
    render json: serialized_data
  end
  
  def create
    def login_player(player)
      player.update(logged_in: true)
      session[:player_id] = player.id
      payload = {player_id: player.id}
      token = encode_token(payload)
      serialized_data = PlayerSerializer.new(player).to_serialized_json
      render json: {player: serialized_data, jwt: token}
    end

    player = Player.find_by(name: params[:name])

    if player
      if player.authenticate(params[:password])
        login_player(player)
      else
        render json: {
            errors: "incorrect password. check password or create new user"
          }, status: 422
      end
    else
      player = Player.create(name: params[:name], password: params[:password])
      login_player(player)
    end
  end

  def auto_login
    if session_player
      session_player.update(logged_in: true)
      session[:player_id] = player.id
      serialized_data = PlayerSerializer.new(session_player).to_serialized_json
      render json: {player: serialized_data}
      ApplicationCable::Channel.set_current_player(session_player)
      ActionCable.server.broadcast "players_channel", serialized_data
    else
      render json: {errors: "no user logged in"}
    end
  end
end
