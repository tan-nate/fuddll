import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ActionCableProvider } from 'react-actioncable-provider';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import boardsReducer from './reducers/boardsReducer';
import pointsReducer from './reducers/pointsReducer';
import linesReducer from './reducers/linesReducer';
import guessesReducer from './reducers/guessesReducer';
import guessPointsReducer from './reducers/guessPointsReducer';
import playersReducer from './reducers/playersReducer';

const rootReducer = combineReducers({
  boards: boardsReducer,
  points: pointsReducer, 
  lines: linesReducer,
  guesses: guessesReducer,
  guessPointPositions: guessPointsReducer,
  players: playersReducer,
});

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));

ReactDOM.render(
  // change to 'wss://fuddll.herokuapp.com/cable' in production
  // change to 'ws://localhost:3000/cable' in development
  <ActionCableProvider url={'ws://localhost:3000/cable'}>
    <Provider store={store}>
      <App />
    </Provider>
  </ActionCableProvider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
