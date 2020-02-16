import React from 'react';
import ActionCable from 'actioncable';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: false,
    };
  }

  componentDidMount() {
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    cable.subscriptions.create({
      channel: 'ChallengesChannel',
      player: this.props.currentPlayer.id,
    }, {
      received: response => {this.handleChallenge(response)},
    })
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

export default Player;