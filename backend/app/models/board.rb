class Board < ApplicationRecord
  has_many :spaces
  has_many :guesses
  belongs_to :player
  belongs_to :game

  def self.custom_create(game:, player:)
    board = self.create(game: game, player: player)
    (0..9).to_a.each do |x|
      space = Space.create(x_coordinate: x, board: board)
      (0..9).to_a.each do |y|
        space.y_coordinate = y
      end
    end

    (0..9).to_a.each do |x|
      guess = Guess.create(x_coordinate: x, board: board)
      (0..9).to_a.each do |y|
        guess.y_coordinate = y
      end
    end
    board
  end
end
