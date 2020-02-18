import React from 'react';
import ActionCable from 'actioncable';

import { connect } from 'react-redux';
import { broadcastInGame, acceptRequest, declineRequest, storeOpponent } from '../../actions/playerActions';
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

  componentDidUpdate(prevProps) {
    if (this.props.opponent && this.props.boards.length > prevProps.boards.length && this.props.boards.length === 2) {
      this.state.challengerIds.forEach(() => {
        this.handleDecline();
      })

      acceptRequest({
        accepterId: this.props.currentPlayer.id,
        challengerId: this.props.opponent.id, 
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

  findChallenger = (challengerId) => {
    return this.props.players.find(player => player.id === challengerId);
  }

  handleAccept = event => {
    event.preventDefault();
    this.props.createGame({
      accepterId: this.props.currentPlayer.id,
      challengerId: this.state.challengerIds[0],
    });

    this.props.storeOpponent(this.findChallenger(this.state.challengerIds[0]));

    broadcastInGame(this.props.currentPlayer.id);
  }

  handleDecline = event => {
    event.preventDefault();
    declineRequest(this.state.challengerIds[0]);
    this.setState({
      challengerIds: this.state.challengerIds.slice(1),
    });
  }

  render() {
    if (this.props.opponent && this.props.boards.length === 2) {
      return <Game />;
    } else if (this.state.challengerIds.length > 0) {
      return (
        <div className="challenge-alert">
          <p>{this.findChallengers()[0].name} wants to play</p>
          <button className="accept" onClick={event => this.handleAccept(event)}>
            fuddll
          </button>
          <button onClick={event > this.handleDecline(event)}>
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
    createGame: ({ accepterId, challengerId }) => dispatch(createGame({ accepterId, challengerId })),
    storeOpponent: opponent => dispatch(storeOpponent(opponent)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)