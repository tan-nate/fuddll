class DropGuessesTable < ActiveRecord::Migration[6.0]
  def change
    drop_table :guesses
  end
end
