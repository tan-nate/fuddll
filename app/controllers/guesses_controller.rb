class GuessesController < ApplicationController
  def index
    guesses = Guess.all
    render json: GuessSerializer.new(guesses).to_serialized_json
  end
  
  def create
    guess = Guess.find_or_initialize_by(guess_params)
    if guess.save
      data = GuessSerializer.new(guess).to_serialized_json
      render json: data
      GamesChannel.broadcast_to guess.game, data
    else
      render json: guess.errors, status: :unprocessable_entity
    end
  end

  def destroy
    guess = Guess.find(params[:id])
    render json: GuessSerializer.new(guess).to_serialized_json
    guess.destroy
  end

  private

  def guess_params
    params.require(:guess).permit(:point1_id, :point2_id, :board_id)
  end
end
