import React from 'react';
import ActionCable from 'actioncable';
import { connect } from 'react-redux';

import NavBar from './NavBar';

class Game1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challengerId: null,
    };
  }
  
  componentDidMount() {
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    cable.subscriptions.create({
      channel: 'RequestsChannel', 
      player: this.props.currentPlayer.id,
    }, {
      received: response => {this.handleReceived(response)},
    });
  }

  handleReceived = (response) => {
    const json = JSON.parse(response);
    this.setState({
      challengerId: json.challenger_id,
    });
  }

  findChallenger = () => {
    return this.props.players.find(player => player.id === this.state.challengerId);
  }

  handleDecline = () => {
    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ challenger_id: this.state.challengerId }),
    };

    fetch('/decline_request', headers)
      .then(this.setState({
        challengerId: null,
      }))
  }

  render() {
    if (this.state.challengerId) {
      return (
        <div className="challenge-alert">
          <p>{this.findChallenger().name} wants to play</p>
          <button className="accept">
            fuddll
          </button>
          <button onClick={this.handleDecline}>
            no thanks
          </button>
        </div>
      );
    } else {
      return <NavBar />;
    }
  }
}

const mapStateToProps = ({ players }) => ({
  currentPlayer: players.currentPlayer,
  players: players.players,
})

export default connect(mapStateToProps)(Game1)