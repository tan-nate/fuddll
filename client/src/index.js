import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

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
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
