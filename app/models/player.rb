class Player < ApplicationRecord
  has_secure_password

  has_many :boards
  has_many :games, through: :boards

  def is_online
    self.update_attributes(logged_in: true)
  end

  def is_offline
    self.update_attributes(logged_in: false)
  end

  validates :name, presence: true
  validates :name, format: { without: /\s/ }
end
