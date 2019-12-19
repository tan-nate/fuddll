class Player < ApplicationRecord
  has_many :games, through: :boards
end
