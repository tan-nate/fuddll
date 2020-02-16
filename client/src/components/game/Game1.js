import React from 'react';
import ActionCable from 'actioncable';

import { connect } from 'react-redux';
import { storeOpponent } from '../../actions/playerActions';

import NavBar from './NavBar';

class Game1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challengerIds: [],
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
      challengerIds: [...this.state.challengerIds, json.challenger_id]
    });
  }

  findChallengers = () => {
    return this.state.challengerIds.map(challengerId => {
      return this.props.players.find(player => player.id === challengerId);
    })
  }

  handleAccept = () => {
    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ challenger_id: this.state.challengerIds[0] }),
    };

    fetch('/accept_request', headers)
      .then(response => response.json())
      .then(player => this.props.storeOpponent(player));

    this.setState({
      challengerIds: this.state.challengerIds.slice(1),
    });
  }

  handleDecline = () => {
    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ challenger_id: this.state.challengerIds[0] }),
    };

    fetch('/decline_request', headers)
      .then(this.setState({
        challengerIds: this.state.challengerIds.slice(1),
      }))
  }

  render() {
    if (this.state.challengerIds.length > 0) {
      return (
        <div className="challenge-alert">
          <p>{this.findChallengers()[0].name} wants to play</p>
          <button className="accept" onClick={this.handleAccept}>
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
});

const mapDispatchToProps = dispatch => {
  return {
    storeOpponent: opponent => dispatch(storeOpponent(opponent)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game1)