class CreatePoints < ActiveRecord::Migration[6.0]
  def change
    create_table :points do |t|
      t.integer :x
      t.integer :y

      t.timestamps
    end
  end
end
