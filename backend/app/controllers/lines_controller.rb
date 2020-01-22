class LinesController < ApplicationController
  def create
    line = Line.find_or_initialize_by(line_params)
    if line.save
      render json: LineSerializer.new(line).to_serialized_json
    else
      render json: line.errors, status: :unprocessable_entity
    end
  end

  def destroy
    line = Line.find(params[:id])
    render json: LineSerializer.new(line).to_serialized_json
    line.destroy
  end

  private

  def line_params
    params.require(:line).permit(:point1_id, :point2_id, :board_id)
  end
end
