import React from 'react';
import ActionCable from 'actioncable';

import { connect } from 'react-redux';
import { storeOpponent, broadcastInGame } from '../../actions/playerActions';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: false,
      inGame: false,
    };
  }

  componentDidMount() {
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    cable.subscriptions.create({
      channel: 'ChallengesChannel',
      player: this.props.currentPlayer.id,
    }, {
      received: response => {this.handleChallenge(response)},
    });
    cable.subscriptions.create("PlayersChannel", {
      received: response => {this.handleInGame(response)},
    });
  }
  
  sendChallenge = ({ playerId }) => {
    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ player_id: playerId }),
    }
  
    fetch('/challenge', headers)
      .then(response => response.json())
      .then(this.setState({
        waiting: true,
      }));
  }

  handleChallenge = response => {
    const json = JSON.parse(response);
    if (json.decline) {
      this.setState({
        waiting: false,
      });
    } else if (json.accept) {
      this.props.storeOpponent(this.props.player);
      broadcastInGame(this.props.currentPlayer.id);
    }
  }

  handleInGame = response => {
    const json = JSON.parse(response);
    if (json.in_game === this.props.player.id) {
      this.setState({
        inGame: true,
      });
    }
  }
  
  handleClick = () => {
    this.sendChallenge({ playerId: this.props.player.id });
  }
  
  render() {
    if (this.state.waiting) {
      return (
        <li className="player">
          <p>{this.props.player.name}</p>
          <button disabled className="waiting">waiting</button>
        </li>
      );
    } else if (this.state.inGame) {
      return (
        <li className="player">
          <p>{this.props.player.name}</p>
          <button disabled className="waiting">in game</button>
        </li>
      );
    } else {
      return (
        <li className="player">
          <p>{this.props.player.name}</p>
          <button onClick={this.handleClick} className="challenge">play</button>
        </li>
      );
    }
  }
}

const mapStateToProps = ({ players }) => ({
  currentPlayer: players.currentPlayer,
});

const mapDispatchToProps = dispatch => {
  return {
    storeOpponent: opponent => dispatch(storeOpponent(opponent)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);