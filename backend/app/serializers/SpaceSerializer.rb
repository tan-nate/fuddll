class SpaceSerializer
  def initialize(space_object)
    @space = space_object
  end
  def to_serialized_json
    options = {
      except: [:created_at, :updated_at]
    }
    @space.to_json(options)
  end
end