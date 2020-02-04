import React from 'react';
import Game from './containers/Game';
import Auth from './components/Auth';
import Players from './containers/Players';

function App() {
  return (
    <>
      <Auth />
      <Players />
      <Game />
    </>
  );
}

export default App;
