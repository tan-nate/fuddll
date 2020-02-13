class PlayersChannel < ApplicationCable::Channel
  def subscribed
    stream_from "players_channel"
  end

  def unsubscribed
    current_player.update(logged_in: false)
    serialized_data = PlayerSerializer.new(current_player).to_serialized_json
    ActionCable.server.broadcast "players_channel", serialized_data
    session.clear
  end
end
