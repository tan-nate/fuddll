class RemovePlayerIdFromSpaces < ActiveRecord::Migration[6.0]
  def change

    remove_column :spaces, :player_id, :integer
  end
end
