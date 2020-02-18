import React from 'react';
import ActionCable from 'actioncable';

import { connect } from 'react-redux';
import { broadcastInGame, acceptRequest, declineRequest } from '../../actions/playerActions';
import { createGame } from '../../actions/gameActions';

import Game from './Game';
import NavBar from './NavBar';

class GameContainer extends React.Component {
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

  componentDidUpdate() {
    if (this.props.opponent) {
      this.state.challengerIds.forEach(() => {
        this.handleDecline();
      })
    }
    
    if (this.props.boards.length === 1) {
      this.props.acceptRequest({
        accepterId: this.props.currentPlayer.id,
        challengerId: this.state.challengerIds[0], 
        gameId: this.props.boards[0].game_id,
      });
    }
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
    this.props.createGame({
      accepterId: this.props.currentPlayer.id,
      challengerId: this.state.challengerIds[0],
    });

    broadcastInGame(this.props.currentPlayer.id);
  }

  handleDecline = () => {
    declineRequest(this.state.challengerIds[0]);
    this.setState({
      challengerIds: this.state.challengerIds.slice(1),
    });
  }

  render() {
    if (this.props.opponent) {
      return <Game currentPlayer={this.props.currentPlayer} opponent={this.props.opponent} boards={this.props.boards}></Game>;
    } else if (this.state.challengerIds.length > 0) {
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

const mapStateToProps = ({ players, boards }) => ({
  currentPlayer: players.currentPlayer,
  players: players.players,
  opponent: players.opponent,
  boards
});

const mapDispatchToProps = dispatch => {
  return {
    acceptRequest: challengerId => dispatch(acceptRequest(challengerId)),
    createGame: ({ accepterId, challengerId }) => dispatch(createGame({ accepterId, challengerId })),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)