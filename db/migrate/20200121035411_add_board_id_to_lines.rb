class AddBoardIdToLines < ActiveRecord::Migration[6.0]
  def change
    add_column :lines, :board_id, :integer
  end
end
