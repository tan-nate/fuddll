class DropSpacesTable < ActiveRecord::Migration[6.0]
  def change
    drop_table :spaces
  end
end
