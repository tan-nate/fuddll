class ApplicationController < ActionController::API
  def current_player
    @current_player ||= Player.find(session[:player_id])
  end

  def logged_in?
    !!current_player
  end
end
