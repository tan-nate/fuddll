class Player < ApplicationRecord
  has_secure_password

  has_many :boards
  has_many :games, through: :boards
end
