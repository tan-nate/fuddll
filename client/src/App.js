import React from 'react';
import Game from './components/game/Game';
import Auth from './components/Auth';
import Players from './components/game/Players';

import { connect } from 'react-redux';
import { autoLogin } from './actions/playerActions';

class App extends React.Component {
  componentDidMount() {
    if (localStorage.getItem("token")) {
      autoLogin();
    }
  }
  
  render() {
    if (localStorage.getItem("token")) {
      return (
        <>
          <Auth />
          <Players />
          <Game />
        </>
      );
    } else return (
      <>
        <Auth />
      </>
    );
  }
}

export default App;
