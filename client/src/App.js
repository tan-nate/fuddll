import React, { useEffect } from 'react';
import Game from './components/game/Game';
import Auth from './components/Auth';
import Players from './components/game/Players';

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch('http://localhost:3000/auto_login', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
        .then(resp => resp.json())
        .then(data => {
          console.log(data)
          // setUser(data);
        })
      })
    }
  }, [])

  return (
    <>
      <Auth />
      <Players />
      <Game />
    </>
  );
}

export default App;
