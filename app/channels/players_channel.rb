class PlayersChannel < ApplicationCable::Channel
  def subscribed
    stream_from "players_channel"
  end

  def unsubscribed
  end
end
