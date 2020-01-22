# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

natedogg = Player.create(name: "natedogg", in_game: false)
opponent = Player.create(name: "opponent", in_game: false)
game = Game.create

nate_board = Board.custom_create(game: game, player: natedogg)
opp_board = Board.custom_create(game: game, player: opponent)

# Line.create(board_id: 1, point1_id: 1, point2_id: 2)
# Line.create(board_id: 1, point1_id: 2, point2_id: 3)
# Line.create(board_id: 1, point1_id: 3, point2_id: 4)
# Line.create(board_id: 1, point1_id: 4, point2_id: 8)
# Line.create(board_id: 1, point1_id: 8, point2_id: 12)
# Line.create(board_id: 1, point1_id: 12, point2_id: 16)
# Line.create(board_id: 1, point1_id: 16, point2_id: 15)
# Line.create(board_id: 1, point1_id: 15, point2_id: 14)
# Line.create(board_id: 1, point1_id: 14, point2_id: 13)
# Line.create(board_id: 1, point1_id: 13, point2_id: 9)
# Line.create(board_id: 1, point1_id: 9, point2_id: 5)
# Line.create(board_id: 1, point1_id: 5, point2_id: 1)