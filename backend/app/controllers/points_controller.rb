class PointsController < ApplicationController
  def index
    points = Point.all
    render json: PointSerializer.new(points).to_serialized_json
  end
end
