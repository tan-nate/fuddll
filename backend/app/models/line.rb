class Line < ApplicationRecord
  belongs_to :point1, class_name: 'Point'
  belongs_to :point2, class_name: 'Point'
end
