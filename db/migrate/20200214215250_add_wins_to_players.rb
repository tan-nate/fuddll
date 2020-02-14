class AddWinsToPlayers < ActiveRecord::Migration[6.0]
  def change
    add_column :players, :wins, :integer, default: 0
  end
end
