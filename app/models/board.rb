class Board < ApplicationRecord
  has_many :points
  has_many :lines
  has_many :guesses
  belongs_to :player
  belongs_to :game

  def self.custom_create(player_id:, game_id:)
    board = self.create(player_id: player_id, game_id: game_id)
    (0..3).to_a.each do |y|
      (0..3).to_a.each do |x|
        Point.create(board: board, x: x, y: y)
      end
    end
    board
  end
end
