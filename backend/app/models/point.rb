class Point < ApplicationRecord
  belongs_to :board

  has_many :point1_joins, foreign_key: :point2_id, class_name: 'Line'
  has_many :point1s, through: :point1_joins

  has_many :point2_joins, foreign_key: :point1_id, class_name: 'Line'
  has_many :point2s, through: :point2_joins

  def points
    point1s + point2s
  end

  def connect(point)
    point1s << point
  end
end
