class GuessSerializer
  def initialize(guess_object)
    @guess = guess_object
  end
  def to_serialized_json
    options = {
      except: [:created_at, :updated_at],
      include: {
        point1: {
          only: [:x, :y]
        },
        point2: {
          only: [:x, :y]
        }
      }
    }
    @guess.to_json(options)
  end
end