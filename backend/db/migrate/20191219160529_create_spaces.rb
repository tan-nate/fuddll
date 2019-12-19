class CreateSpaces < ActiveRecord::Migration[6.0]
  def change
    create_table :spaces do |t|
      t.integer :player_id
      t.integer :x_coordinate
      t.integer :y_coordinate
      t.string :ship
      t.boolean :hit

      t.timestamps
    end
  end
end
