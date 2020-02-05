class PlayerSerializer
  def initialize(player_object)
    @player = player_object
  end
  def to_serialized_json
    options = {
      except: [:created_at, :updated_at, :password_digest]
    }
    @player.to_json(options)
  end
end