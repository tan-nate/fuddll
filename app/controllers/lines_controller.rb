class LinesController < ApplicationController
  def index
    lines = Line.all
    render json: LineSerializer.new(lines).to_serialized_json
  end
  
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

  def broadcast_fuddll
    board = Board.find(params[:board_id])
    GamesChannel.broadcast_to board.game, {lines: board.lines}.to_json
    render json: {broadcast_fuddll: true}
  end

  private

  def line_params
    params.require(:line).permit(:point1_id, :point2_id, :board_id)
  end
end
