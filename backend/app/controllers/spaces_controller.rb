class SpacesController < ApplicationController
  def index
    spaces = Space.all
    render json: SpaceSerializer.new(spaces).to_serialized_json
  end
end
