class GamesController < ApplicationController
  def create
    accepter_id = params[:accepter_id]
    challenger_id = params[:challenger_id]

    game = Game.custom_create(accepter_id: accepter_id, challenger_id: challenger_id)
    accepter_board = game.boards.find_by(player_id: accepter_id)
    challenger_board = game.boards.find_by(player_id: challenger_id)

    data = {
      accepter_board,
      challenger_board,
      game
    }
    render json: data
  end
end