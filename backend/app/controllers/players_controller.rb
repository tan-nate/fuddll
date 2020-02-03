class PlayersController < ApplicationController
  def create
    player = Player.new(name: params[:name], password: params[:password], password_confirmation: params[:password_confirmation])
    if player.save
      render json: PlayerSerializer.new(player).to_serialized_json
    else
      render json: {
        errors: player.errors.full_messages
      }, status: 422
    end
  end
end
