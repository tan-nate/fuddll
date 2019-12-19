class AddBoardIdToGuesses < ActiveRecord::Migration[6.0]
  def change
    add_column :guesses, :board_id, :integer
  end
end
