class Player < ApplicationRecord
  has_many :boards
  has_many :games, through: :boards
end
