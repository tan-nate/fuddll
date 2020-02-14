class AddLossesToPlayers < ActiveRecord::Migration[6.0]
  def change
    add_column :players, :losses, :integer, default: 0
  end
end
