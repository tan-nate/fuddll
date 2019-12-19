class RemovePlayerIdFromGuesses < ActiveRecord::Migration[6.0]
  def change

    remove_column :guesses, :player_id, :integer
  end
end
