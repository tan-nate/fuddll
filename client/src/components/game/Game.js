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
      renderingIntro: true,
      renderingFuddllIntro: false,
      fuddllCount: 120,
      guessCount: 20,
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

    if (!this.state.renderingIntro && this.state.fuddllCount === 120) {
      var countdown = this.startFuddllCountdown();
    }

    if (this.state.fuddllCount === 0) {
      clearInterval(countdown);
    }
  }

  startFuddllCountdown = () => {
    setInterval(() => {
      const newCount = this.state.fuddllCount - 1;
      this.setState({
        fuddllCount: newCount,
      });
    }, 1000);
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

  stopRenderingIntro = () => {
    setTimeout(() => {
      this.setState({
        renderingFuddllIntro: true,
      })
    }, 3000);
    setTimeout(() => {
      this.setState({
        renderingIntro: false,
        renderingFuddllIntro: false,
      })
    }, 6000);
  }

  setFuddllSent = () => {
    this.setState({
      fuddllSent: true,
    });
  }
  
  render() {
    if (this.state.fuddllCount === 0) {
      clearInterval(this.startFuddllCountdown());
    }
    if (this.state.renderingFuddllIntro && this.state.renderingIntro) {
      return (
        <div className="intro fuddll-intro">
          <p>fuddll</p>
        </div>
      );
    } else if (this.state.renderingIntro) {
      this.stopRenderingIntro();
      return (
        <div className="intro">
          <p>{this.props.currentPlayer.name} <strong>vs</strong> {this.props.opponent.name}</p>
        </div>
      );
    } else if (this.state.fuddlling) {
      return (
        <>
          <Board board={this.ownBoard()} fuddlling={this.state.fuddlling} />
          <Guesses board={this.opponentBoard()} />
        </>
      );
    } else {
      return (
        <>
          <Board board={this.ownBoard()} setFuddllSent={this.setFuddllSent} fuddlling={this.state.fuddlling} fuddllCount={this.state.fuddllCount} />
        </>
      );
    }
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