class Board < ApplicationRecord
  has_many :points
  belongs_to :player
  belongs_to :game

  def self.custom_create(game:, player:)
    board = self.create(game: game, player: player)
    (0..9).to_a.each do |y|
      (0..9).to_a.each do |x|
        Point.create(board: board, x: x, y: y)
      end
    end
    board
  end
end
