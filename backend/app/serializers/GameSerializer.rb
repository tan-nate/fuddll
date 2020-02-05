class GameSerializer
  def initialize(game_object)
    @game = game_object
  end
  def to_serialized_json
    options = {
      except: [:created_at, :updated_at]
    }
    @game.to_json(options)
  end
end