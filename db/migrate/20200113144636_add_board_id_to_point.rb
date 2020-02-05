class AddBoardIdToPoint < ActiveRecord::Migration[6.0]
  def change
    add_column :points, :board_id, :integer
  end
end
