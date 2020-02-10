class PlayersChannel < ApplicationCable::Channel
  def subscribed
    stream_from "players_channel"
  end

  def unsubscribed
    ApplicationCable::Channel.get_current_player.update(logged_in: false)
  end
end
