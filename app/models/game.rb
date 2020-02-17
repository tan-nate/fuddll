class Game < ApplicationRecord
  has_many :boards
  has_many :players, through: :boards

  def self.custom_create(accepter_id:, challenger_id:)
    game = self.create
    accepter_board = Board.custom_create(player_id: accepter_id, game_id: game.id)
    challenger_board = Board.custom_create(player_id: challenger_id, game_id: game.id)
    game
  end
end
