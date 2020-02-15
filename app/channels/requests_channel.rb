class RequestsChannel < ApplicationCable::Channel
  def subscribed
    player = Player.find(params[:player])
    stream_for player
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
