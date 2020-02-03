class PlayersController < ApplicationController
  def create
    byebug
    player = Player.create(player_params)
    render json: PlayerSerializer.new(player).to_serialized_json
  end

  private

  def player_params
    params.require(:player).permit(:name, :password, :password_confirmation)
  end
end
