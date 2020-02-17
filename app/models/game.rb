class Game < ApplicationRecord
  has_many :boards
  has_many :players, through: :boards

  def self.custom_create(accepter_id:, challenger_id:)
    accepter_board = Board.custom_create(accepter_id)
    challenger_board = Board.custom_create(challenger_id)

    game = self.create
    accepter_board.game = game
    challenger_board.game = game
    game
  end
end
