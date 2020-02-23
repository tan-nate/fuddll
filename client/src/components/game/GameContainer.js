import React from 'react';
import ActionCable from 'actioncable';

import { connect } from 'react-redux';
import { broadcastInGame, acceptRequest, declineRequest, storeOpponent } from '../../actions/playerActions';
import { createGame } from '../../actions/gameActions';

import Game from './Game';
import NavBar from './NavBar';
import { WS_URL } from '../../constants';

class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challengerIds: [],
      challengerInGame: false,
      challengerName: null,
    };
  }
  
  componentDidMount() {
    const cable = ActionCable.createConsumer(WS_URL);

    cable.subscriptions.create({
      channel: 'RequestsChannel', 
      player: this.props.currentPlayer.id,
    }, {
      received: response => {this.handleReceived(response)},
    });

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

  componentDidUpdate(prevProps) {
    if (this.props.opponent && this.props.boards.length > prevProps.boards.length && this.props.boards.length === 2) {
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

  handleChallenge = response => {
    const json = JSON.parse(response);
    if (json.accepter_board) {
      this.props.addBoard(json.accepter_board);
      this.props.addBoard(json.challenger_board);
      broadcastInGame(this.props.currentPlayer.id);
      this.props.storeOpponent(this.findChallenger(json.accepter_board.player_id));
    }
  }

  handleInGame = response => {
    const json = JSON.parse(response);
    if (json.in_game && this.findChallengers()[0] && json.in_game === this.findChallengers()[0].id) {
      this.setState({ challengerInGame: true });
      this.setState({ challengerName: this.findChallengers()[0].name })
      this.setState({
        challengerIds: this.state.challengerIds.slice(1),
      });
    }
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
    if (!this.state.challengerInGame) {
      this.props.createGame({
        accepterId: this.props.currentPlayer.id,
        challengerId: this.state.challengerIds[0],
      });
      this.props.storeOpponent(this.findChallenger(this.state.challengerIds[0]));
      broadcastInGame(this.props.currentPlayer.id);
    } 
  }

  handleDecline = event => {
    event.preventDefault();
    declineRequest({ currentPlayerId: this.props.currentPlayer.id, challengerId: this.state.challengerIds[0] });
    this.setState({
      challengerIds: this.state.challengerIds.slice(1),
    });
  }

  render() {
    if (this.props.opponent && this.props.boards.length >= 2) {
      return <Game boards={this.props.boards} />;
    } else if (this.state.challengerInGame) {
      setTimeout(() => {
        window.location.reload(false);
      }, 3000);
      return (
        <div className="intro">
          <p>{this.state.challengerName} is in a game</p>
        </div>
      );
    } else if (this.state.challengerIds.length > 0) {
      return (
        <div className="challenge-alert">
          <p>{this.findChallengers()[0].name} wants to play</p>
          <button className="accept" onClick={event => this.handleAccept(event)}>
            fuddll
          </button>
          <button onClick={event => this.handleDecline(event)}>
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
    addBoard: board => dispatch({ type: 'ADD_BOARD', board: board }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)