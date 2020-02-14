Rails.application.routes.draw do
  resources :guesses
  resources :boards
  resources :points
  resources :lines
  resources :players
  resources :games
  get '/get_current_player', to: 'players#get_current_player'
  get '/scoreboard', to: 'players#scoreboard'
  mount ActionCable.server => '/cable'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
