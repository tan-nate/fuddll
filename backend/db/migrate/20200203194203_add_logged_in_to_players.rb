class AddLoggedInToPlayers < ActiveRecord::Migration[6.0]
  def change
    add_column :players, :logged_in, :boolean
  end
end
