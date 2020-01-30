Rails.application.routes.draw do
  resources :guesses
  resources :boards
  resources :points
  resources :lines
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
