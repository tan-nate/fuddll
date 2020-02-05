Rails.application.routes.draw do
  resources :guesses
  resources :boards
  resources :points
  resources :lines
  resources :players
  resources :games
  mount ActionCable.server => '/cable'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
