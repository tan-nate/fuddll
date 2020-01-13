class PointSerializer
  def initialize(point_object)
    @point = point_object
  end
  def to_serialized_json
    options = {
      except: [:created_at, :updated_at]
    }
    @point.to_json(options)
  end
end