module ApplicationCable
  class Channel < ActionCable::Channel::Base
    def self.set_current_player(player)
      @current_player = player
    end

    def self.get_current_player
      @current_player
    end
  end
end
