import React from 'react';
import Game from './components/game/Game';
import Auth from './components/Auth';
import Players from './components/game/Players';

function App() {
  const token = localStorage.getItem("token");
  if (token) {
    return (
      <>
        <Auth />
        <Players />
        <Game />
      </>
    )
  } else return (
    <>
      <Auth />
    </>
  );
}

export default App;
