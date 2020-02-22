import React from 'react';
import ActionCable from 'actioncable';
import { connect } from 'react-redux';

import Board from '../boards/Board';
import Guesses from '../boards/Guesses';
import { sendWin } from '../../actions/gameActions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fuddllSent: false,
      fuddlling: false,
      fuddllReceived: false,
      renderingIntro: true,
      renderingFuddllIntro: false,
      fuddllCount: 90,
      guessCount: 25,
      waiting: true,
      won: false,
      hits: [],
    };
  }

  componentDidMount() {
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    this.channel = cable.subscriptions.create({
      channel: 'GamesChannel', 
      game: this.props.boards[0].game_id,
    }, {
      received: response => {this.handleReceived(response)},
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.renderingIntro && this.state.fuddllCount === 90) {
      setInterval(() => {
        const newCount = this.state.fuddllCount - 1;
        this.setState({
          fuddllCount: newCount,
        });
      }, 1000);
    }

    if (this.state.fuddllSent && !prevState.fuddllSent) {
      this.setState({
        fuddllCount: 10000,
      });
    }
    
    if (this.state.fuddllSent && this.state.fuddllReceived && (!prevState.fuddllSent || !prevState.fuddllReceived)) {
      this.setState({
        fuddlling: true,
      });
    }

    if (this.state.fuddlling && !prevState.fuddlling) {      
      if (this.props.boards[1].player_id === this.props.currentPlayer.id) {
        this.setState({
          waiting: false,
        });
      }
    }

    if (!this.state.waiting && this.state.guessCount === 25) {
      setInterval(() => {
        const newCount = this.state.guessCount - 1;
        this.setState({
          guessCount: newCount,
        });
      }, 1000);
    }

    if (this.state.waiting && !prevState.waiting) {
      this.setState({
        guessCount: 10000,
      })
    }

    if (!this.state.waiting && prevState.waiting) {
      this.setState({
        guessCount: 24,
      })
    }
  }

  handleReceived = response => {
    const json = JSON.parse(response);
    console.log(json);
    if (json.board_id && json.board_id === this.ownBoard().id) {
      this.props.addGuess({ guess: json });
      this.setState({
        waiting: false,
      })
    } else if (Array.isArray(json) && json[0].board_id === this.opponentBoard().id) {
      this.props.addLines(json);
      this.setState({ fuddllReceived: true });
    } else if (json.out_of_game === this.props.opponent.id) {
      this.winAction();
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

  setWaitingTrue = () => {
    this.setState({
      waiting: true,
    })
  }

  gameOverTimeout = () => {
    this.channel.unsubscribe();
    setTimeout(() => {
      window.location.reload(false);
    }, 4000);
  }

  winAction = () => {
    sendWin({ winnerId: this.props.currentPlayer.id, loserId: this.props.opponent.id });
    this.setState({
      won: true,
    });
    this.gameOverTimeout();
  }

  storeHit = (guessId) => {
    const prevHits = this.state.hits;
    this.setState({
      hits: [...prevHits, guessId],
    })
  }
  
  render() {
    if (this.state.won) {
      return (
        <div className="intro fuddll-intro">
          <p>you won</p>
        </div>
      );
    } else if (this.state.fuddllCount <= 0 || this.state.guessCount <= 0 || [...new Set(this.state.hits)].length === 12) {
      this.gameOverTimeout();
      return (
        <div className="intro">
          <p>you lost</p>
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
          <Board board={this.ownBoard()} fuddlling={this.state.fuddlling} storeHit={this.storeHit} />
          <Guesses board={this.opponentBoard()} waiting={this.state.waiting} guessCount={this.state.guessCount} setWaitingTrue={this.setWaitingTrue} />
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
    addGuess: ({ guess }) => dispatch({ type: 'ADD_GUESS', guess }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);