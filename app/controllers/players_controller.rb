class PlayersController < ApplicationController
  def create
    def login_and_broadcast_player(player)
      payload = {player_id: player.id}
      token = encode_token(payload)
      render json: {player: player, jwt: token}
      ActionCable.server.broadcast "players_channel", {player: player}
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
