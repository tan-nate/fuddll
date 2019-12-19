class Game < ApplicationRecord
  has_many :boards
  has_many :players, through: :boards

  def initialize(player1, player2)
    board1 = Board.create(player: player1)
    board2 = Board.create(player: player2)
    board1.game = self
    board2.game = self
  end
end
