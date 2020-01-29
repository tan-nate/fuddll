class CreateGuesses < ActiveRecord::Migration[6.0]
  def change
    create_table :guesses do |t|
      t.integer :point1_id
      t.integer :point2_id
      t.boolean :hit

      t.timestamps
    end
  end
end
