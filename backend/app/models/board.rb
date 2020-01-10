class Board < ApplicationRecord
  has_many :spaces
  has_many :guesses
  belongs_to :player
  belongs_to :game

  def self.custom_create(game:, player:)
    board = self.create(game: game, player: player)
    (0..9).to_a.each do |y|
      (0..9).to_a.each do |x|
        Space.create(board: board, x_coordinate: x, y_coordinate: y)
      end
    end

    (0..9).to_a.each do |y|
      (0..9).to_a.each do |x|
        Guess.create(board: board, x_coordinate: x, y_coordinate: y)
      end
    end
    board
  end
end
