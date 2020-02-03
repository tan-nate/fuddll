class PlayersChannel < ApplicationCable::Channel
  def subscribed
    game = Game.find(params[:game])
    stream_for game
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
