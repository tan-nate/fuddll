class AddBoardIdToSpaces < ActiveRecord::Migration[6.0]
  def change
    add_column :spaces, :board_id, :integer
  end
end
