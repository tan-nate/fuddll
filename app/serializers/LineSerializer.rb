class LineSerializer
  def initialize(line_object)
    @line = line_object
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
      },
      methods: :player_id
    }
    @line.to_json(options)
  end
end