class BoardsController < ApplicationController
  def index
    boards = Board.all
    render json: BoardSerializer.new(boards).to_serialized_json
  end

  def create
    board = Board.custom_create(player_id: params[:player_id])
    render json: BoardSerializer.new(board).to_serialized_json
  end
end
