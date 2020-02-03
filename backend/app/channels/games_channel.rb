class GamesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "games_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
