import React, { useEffect } from 'react';
import Game from './containers/Game';
import Auth from './components/Auth';
import Players from './containers/Players';

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
          setUser(data);
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
