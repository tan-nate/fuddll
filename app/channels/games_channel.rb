class GamesChannel < ApplicationCable::Channel
  def subscribed
    game = Game.find(params[:game])
    stream_for game
  end

  def unsubscribed
    current_player.update(in_game: false)
    ActionCable.server.broadcast "players_channel", {out_of_game: params[:player_id]}.to_json
    GamesChannel.broadcast_to current_player.games.last, {out_of_game: current_player.id}.to_json
  end
end
