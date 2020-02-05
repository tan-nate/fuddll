class Game < ApplicationRecord
  has_many :boards
  has_many :players, through: :boards
end
