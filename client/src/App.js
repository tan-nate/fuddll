import React from 'react';
import Game1 from './components/game/Game1';
import Auth from './components/game/Auth';

import { connect } from 'react-redux';
import { getCurrentPlayer } from './actions/playerActions';

class App extends React.Component {
  componentDidMount() {
    this.props.getCurrentPlayer();
  }
  
  render() {
    if (this.props.players.currentPlayer) {
      return <Game1 />;
    } else {
      return <Auth />;
    }
  }
}

const mapStateToProps = ({ players }) => ({ players });

const mapDispatchToProps = dispatch => {
  return {
    getCurrentPlayer: () => dispatch(getCurrentPlayer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
