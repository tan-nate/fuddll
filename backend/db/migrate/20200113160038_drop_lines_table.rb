class DropLinesTable < ActiveRecord::Migration[6.0]
  def change
    drop_table :lines
  end
end
