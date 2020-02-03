class GamesController < ApplicationController
  def create
    game = Game.create
    serialized_data = GameSerializer.new(game).to_serialized_json
    ActionCable.server.broadcast "conversations_channel", serialized_data
    head :ok
  end
end