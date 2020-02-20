class GamesChannel < ApplicationCable::Channel
  def subscribed
    game = Game.find(params[:game])
    stream_for game
  end

  def unsubscribed
    current_player.update(in_game: false)
    serialized_data = {out_of_game: params[:player_id]}.to_json
    ActionCable.server.broadcast "players_channel", serialized_data
  end
end
