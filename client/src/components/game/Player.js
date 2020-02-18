import React from 'react';
import ActionCable from 'actioncable';

import { connect } from 'react-redux';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: false,
      inGame: this.props.player.in_game,
      declined: false,
    };
  }

  componentDidMount() {
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');

    cable.subscriptions.create("PlayersChannel", {
      received: response => {this.handleInGame(response)},
    });

    cable.subscriptions.create({
      channel: 'ChallengesChannel',
      player: this.props.player.id,
    }, {
      received: response => {this.handleDecline(response)},
    });
  }

  handleDecline = response => {
    const json = JSON.parse(response);
    if (json.decline && json.challenger_id === this.props.currentPlayer.id) {
      this.setState({
        waiting: false,
      });

      this.setState({
        declined: true,
      });

      setTimeout(() => {
        this.setState({
          declined: false,
        });
      }, 4000);
    }
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
    if (this.state.inGame) {
      return (
        <li className="player">
          <p>{this.props.player.name}</p>
          <button disabled className="waiting">in game</button>
        </li>
      );
    } else if (this.state.waiting) {
      return (
        <li className="player">
          <p>{this.props.player.name}</p>
          <button disabled className="waiting">waiting</button>
        </li>
      );
    } else if (this.state.declined) {
      return (
        <li className="player">
          <p>{this.props.player.name}</p>
          <button disabled className="declined">declined</button>
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

export default connect(mapStateToProps)(Player);