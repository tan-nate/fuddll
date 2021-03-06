import React from 'react';
import GameContainer from './components/game/GameContainer';
import Auth from './components/game/Auth';

import { connect } from 'react-redux';
import { getCurrentPlayer } from './actions/playerActions';

class App extends React.Component {
  componentDidMount() {
    this.props.getCurrentPlayer();
  }
  
  render() {
    if (this.props.players.currentPlayer) {
      return <GameContainer />;
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
