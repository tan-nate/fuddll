class PlayersController < ApplicationController
  def create
    def login_and_broadcast_player(player)
      payload = {player_id: player.id}
      token = encode_token(payload)
      serialized_data = PlayerSerializer.new(player).to_serialized_json
      render json: {player: serialized_data, jwt: token}
      ApplicationCable::Channel.set_current_player(player)
      ActionCable.server.broadcast "players_channel", serialized_data
    end

    player = Player.find_by(name: params[:name])

    if player
      if player.authenticate(params[:password])
        login_and_broadcast_player(player)
      else
        render json: {
            errors: "incorrect password. check password or create new user"
          }, status: 422
      end
    else
      player = Player.create(name: params[:name], password: params[:password])
      login_and_broadcast_player(player)
    end
  end

  def auto_login
    if session_player
      serialized_data = PlayerSerializer.new(session_player).to_serialized_json
      render json: {player: serialized_data}
      ApplicationCable::Channel.set_current_player(session_player)
      ActionCable.server.broadcast "players_channel", serialized_data
    else
      render json: {errors: "no user logged in"}
    end
  end
end
