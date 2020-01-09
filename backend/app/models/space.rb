class Space < ApplicationRecord
  belongs_to :board
  has_many :ships
end
