import React from 'react';
import ActionCable from 'actioncable';
import { connect } from 'react-redux';

import Board from '../boards/Board';
import Guesses from '../boards/Guesses';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fuddllSent: false,
      fuddlling: false,
      fuddllReceived: false,
    };
  }

  componentDidMount() {
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    cable.subscriptions.create({
      channel: 'GamesChannel', 
      game: this.props.boards[0].game_id,
    }, {
      received: response => {this.handleReceived(response)},
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.fuddllSent && this.state.fuddllReceived && (!prevState.fuddllSent || !prevState.fuddllReceived)) {
      this.setState({
        fuddlling: true,
      });
    }
  }

  setFuddllSent = () => {
    this.setState({
      fuddllSent: true,
    });
  }

  handleReceived = response => {
    const json = JSON.parse(response);
    console.log(json);
    if (json.guess && json.guess.board_id === this.ownBoard().id) {
      this.props.addGuess(json.guess);
    } else if (Array.isArray(json) && json[0].board_id === this.opponentBoard().id) {
      this.props.addLines(json);
      this.setState({ fuddllReceived: true });
    } 
  }

  ownBoard = () => {
    return this.props.boards.find(board => board.player_id === this.props.currentPlayer.id);
  }

  opponentBoard = () => {
    return this.props.boards.find(board => board.player_id === this.props.opponent.id);
  }
  
  render() {
    if (this.state.fuddlling) {
      return (
        <>
          <Board board={this.ownBoard()} fuddlling={this.state.fuddlling} />
          <Guesses board={this.opponentBoard()} />
        </>
      );
    }
    return (
      <>
        <Board board={this.ownBoard()} setFuddllSent={this.setFuddllSent} fuddlling={this.state.fuddlling} />
      </>
    );
  }
}

const mapStateToProps = ({ boards, players }) => ({ boards, currentPlayer: players.currentPlayer, opponent: players.opponent });

const mapDispatchToProps = dispatch => {
  return {
    addLines: lines => dispatch({ type: 'ADD_LINES', lines }),
    addGuess: guess => dispatch({ type: 'ADD_GUESS', guess }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);