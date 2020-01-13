class LinesController < ApplicationController
  def create
    line = Line.create(line_params)
    render json: LineSerializer.new(line).to_serialized_json
  end

  private

  def line_params
    params.require(:line).permit(:point1_id, :point2_id)
  end
end
