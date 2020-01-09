class DropShips < ActiveRecord::Migration[6.0]
  def change
    drop_table :ships
  end
end
