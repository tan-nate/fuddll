class BoardSerializer
  def initialize(board_object)
    @board = board_object
  end
  def to_serialized_json
    options = {
      except: [:created_at, :updated_at],
      include: {
        points: {
          except: [:created_at, :updated_at]
        }
        lines: {
          except: [:created_at, :updated_at]
        }
        guesses: {
          except: [:created_at, :updated_at]
        }
      }
    }
    @board.to_json(options)
  end
end