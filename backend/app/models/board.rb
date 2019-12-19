class Board < ApplicationRecord
  has_many :spaces
  has_many :guesses
  belongs_to :player
  belongs_to :game
end
