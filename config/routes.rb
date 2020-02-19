Rails.application.routes.draw do
  resources :guesses
  resources :boards
  resources :points
  resources :lines
  resources :players
  resources :games
  get '/get_current_player', to: 'players#get_current_player'
  get '/scoreboard', to: 'players#scoreboard'
  post '/challenge', to: 'players#challenge'
  post '/accept_request', to: 'players#accept_request'
  post '/decline_request', to: 'players#decline_request'
  post '/broadcast_in_game', to: 'players#broadcast_in_game'
  post '/broadcast_fuddll', to: 'lines#broadcast_fuddll'
  mount ActionCable.server => '/cable'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
