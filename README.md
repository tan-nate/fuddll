fuddll is a game where you draw shapes onto your secret board to befuddll your opponent. Try to guess your opponent's fuddll before they guess yours!

To run the app, fork and clone this repo onto your machine. Ensure that you have postgres installed. In the root directory, run "bundle install", then "rake db:migrate", then "rails s". Create a new terminal and cd into the client folder. Run "yarn install", then "yarn start". In the latest version of Chrome, navigate to localhost:3001. 

Navigate to client/src/constants.js, and change WS_URL to 'ws://localhost:3000/cable'.

To simulate playing a game with an opponent, open a new Chrome window as a Guest or as a new Person. You can open multiple windows as different people to simulate multiple users. 