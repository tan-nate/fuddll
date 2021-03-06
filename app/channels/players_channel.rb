class PlayersChannel < ApplicationCable::Channel
  def subscribed
    stream_from "players_channel"
    serialized_data = {out_of_game: current_player.id}.to_json
    ActionCable.server.broadcast "players_channel", serialized_data
  end

  def unsubscribed
    current_player.update(logged_in: false, in_game: false)
    serialized_data = PlayerSerializer.new(current_player).to_serialized_json
    ActionCable.server.broadcast "players_channel", serialized_data
  end
end
