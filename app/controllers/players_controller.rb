class PlayersController < ApplicationController
  def create
    def login_and_broadcast_player(player)
      payload = {player_id: player.id}
      token = encode_token(payload)
      render json: {user: user, jwt: token}

      # serialized_data = PlayerSerializer.new(player).to_serialized_json
      # render json: serialized_data
      # ActionCable.server.broadcast "players_channel", serialized_data
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
      player = Player.new(name: params[:name], password: params[:password])
      login_and_broadcast_player(player)
    end
  end
end
