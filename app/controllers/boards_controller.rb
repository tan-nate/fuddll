class BoardsController < ApplicationController
  def show
    board = Board.find(params[:id])
    render json: BoardSerializer.new(board).to_serialized_json
  end
end
