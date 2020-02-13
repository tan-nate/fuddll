import React from 'react';
import Game from './components/game/Game';
import Auth from './components/game/Auth';
import Players from './components/game/Players';

import { connect } from 'react-redux';
import { getCurrentPlayer } from './actions/playerActions';

class App extends React.Component {
  componentDidMount() {
    this.props.getCurrentPlayer();
  }
  
  render() {
    if (this.props.players.currentPlayer) {
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

const mapStateToProps = ({ players }) => ({ players });

const mapDispatchToProps = dispatch => {
  return {
    getCurrentPlayer: () => dispatch(getCurrentPlayer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
