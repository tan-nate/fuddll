class RemoveGameIdFromBoards < ActiveRecord::Migration[6.0]
  def change

    remove_column :boards, :game_id, :integer
  end
end
