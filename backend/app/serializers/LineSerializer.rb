class LineSerializer
  def initialize(line_object)
    @line = line_object
  end
  def to_serialized_json
    options = {
      except: [:created_at, :updated_at]
    }
    @line.to_json(options)
  end
end