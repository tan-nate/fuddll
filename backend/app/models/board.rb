class Board < ApplicationRecord
  has_many :spaces
  has_many :guesses
  belongs_to :player
  belongs_to :game

  def self.custom_create
    board = self.create
    (0..9).to_a.each do |n|
      space = Space.create(x_coordinate: n)
      (0..9).to_a.each do |n|
        space.y_coordinate = n
        space.board = board
      end
    end

    (0..9).to_a.each do |n|
      guess = Guess.create(x_coordinate: n)
      (0..9).to_a.each do |n|
        guess.y_coordinate = n
        guess.board = board
      end
    end
    board
  end
end
