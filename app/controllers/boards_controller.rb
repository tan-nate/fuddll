class BoardsController < ApplicationController
  def index
    boards = Board.all
    render json: BoardSerializer.new(boards).to_serialized_json
  end
end
