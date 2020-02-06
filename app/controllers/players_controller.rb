class PlayersController < ApplicationController
  def create
    player = Player.find_by(name: params[:name])
    if player
      if player.authenticate(params[:password])
        serialized_data = PlayerSerializer.new(player).to_serialized_json
        render json: serialized_data
        ActionCable.server.broadcast "players_channel", serialized_data
      else
        render json: {
            errors: "incorrect password. check password or create new user"
          }, status: 422
      end
    end
    if !player
      player = Player.new(name: params[:name], password: params[:password])
      if player.save
        serialized_data = PlayerSerializer.new(player).to_serialized_json
        render json: serialized_data
        ActionCable.server.broadcast "players_channel", serialized_data
      else
        render json: {
          errors: player.errors.full_messages
        }, status: 422
      end
    end
  end
end
