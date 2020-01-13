class CreateLines < ActiveRecord::Migration[6.0]
  def change
    create_table :lines do |t|
      t.integer :point1_id
      t.integer :point2_id
    end
  end
end
