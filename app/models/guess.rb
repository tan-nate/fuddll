class Guess < ApplicationRecord
  belongs_to :point1, class_name: 'Point'
  belongs_to :point2, class_name: 'Point'

  belongs_to :board

  validate :points_must_be_adjacent, :points_must_be_different

  def points_must_be_adjacent
    unless [0, 1].include?((point1.x - point2.x).abs) && [0, 1].include?((point1.y - point2.y).abs)
      errors.add(:base, message: "connected points must be adjacent")
    end
  end

  def points_must_be_different
    if point1 == point2
      errors.add(:base, message: "connected points must be different")
    end
  end
end
