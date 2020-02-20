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
      waiting: true,
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
    // if (!this.state.renderingIntro && this.state.fuddllCount === 120) {
    //   setInterval(() => {
    //     const newCount = this.state.fuddllCount - 1;
    //     this.setState({
    //       fuddllCount: newCount,
    //     });
    //   }, 1000);
    // }
    
    if (this.state.fuddllSent && this.state.fuddllReceived && (!prevState.fuddllSent || !prevState.fuddllReceived)) {
      this.setState({
        fuddlling: true,
      });
    }

    if (this.state.fuddlling && !prevState.fuddlling) {
      if (this.props.boards[0].player_id === this.props.currentPlayer.id) {
        this.setState({
          waiting: false
        });
      }
    }

    if (!this.state.waiting && this.state.guessCount === 20) {
      setInterval(() => {
        const newCount = this.state.guessCount - 1;
        this.setState({
          guessCount: newCount,
        });
      }, 1000);
    }
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
    }, 5000);
  }

  setFuddllSent = () => {
    this.setState({
      fuddllSent: true,
    });
  }

  gameOverTimeout = () => {
    setTimeout(() => {
      window.location.reload(false);
    }, 3000);
  }
  
  render() {
    if (this.state.fuddllCount <= 0) {
      this.gameOverTimeout();
      return (
        <div className="intro">
          <p>{this.props.opponent.name} won</p>
        </div>
      )
    } else if (this.state.renderingFuddllIntro && this.state.renderingIntro) {
      return (
        <div className="intro fuddll-intro">
          <p>fuddll</p>
        </div>
      );
    } else if (this.state.renderingIntro) {
      this.stopRenderingIntro();
      return (
        <div className="intro">
          <p>{this.props.currentPlayer.name} vs {this.props.opponent.name}</p>
        </div>
      );
    } else if (this.state.fuddlling) {
      return (
        <>
          <Board board={this.ownBoard()} fuddlling={this.state.fuddlling} />
          <Guesses board={this.opponentBoard()} waiting={this.state.waiting} guessCount={this.state.guessCount} />
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