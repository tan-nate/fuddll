import React from 'react';
import { connect } from 'react-redux';
import { sendGuess } from '/actions/guessingActions';
import GuessPoint from './GuessPoint';
import Guess from '../drawing/Guess';

class Guesses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connectedPoints: []
    };
  }

  filteredPoints = () => {
    if (this.props.board !== undefined) {
      return this.props.points.filter(point => point.board_id === this.props.board.id);
    } else {
      return [];
    }
  }

  renderPoints = () => {
    if (this.filteredPoints().length !== 0) {
      return this.filteredPoints().map(point => <GuessPoint key={point.id} point={point} connectPoints={this.connectPoints} removePoint={this.removePoint} connectedPoints={this.state.connectedPoints} />);
    } else {
      return null;
    }
  }

  connectPoints = (point) => {
    const newConnectedPoints = this.state.connectedPoints.slice();
    newConnectedPoints.push(point);
    this.setState({
      connectedPoints: newConnectedPoints
    }, this.checkAndSendPoints);
  }

  removePoint = (removedPoint) => {
    this.setState({
      connectedPoints: this.state.connectedPoints.filter(point => point.id !== removedPoint.id)
    });
  }

  checkAndSendPoints = () => {
    if (this.state.connectedPoints.length === 2) {
      this.props.sendGuess({ points: this.state.connectedPoints, board: this.props.board.id });
      this.setState({
        connectedPoints: []
      });
    }
  }

  filteredGuesses = () => {
    if (this.props.guesses.length !== 0 && this.props.board !== undefined) {
      return this.props.guesses.filter(guess => guess.board_id === this.props.board.id);
    } else {
      return [];
    }
  }

  filteredGuessPointPositions = () => {
    return this.props.guessPointPositions.filter(pointPosition => pointPosition.board_id === this.props.board.id);
  }

  renderGuesses = () => {
    if (this.props.guesses.length !== 0) {
      return this.filteredGuesses().map(guess => <Guess key={guess.id} guess={guess} pointPositions={this.filteredGuessPointPositions()} board={this.props.board} />);
    }
  }

  render() {
    return (
      <div className="board-container">
        <div className="board">
          {this.renderPoints()}
          {this.renderGuesses()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ points, guesses, guessPointPositions }) => ({
  points: points.points, 
  guesses,
  guessPointPositions,
});

const mapDispatchToProps = dispatch => {
  return {
    sendGuess: ({ points, board }) => dispatch(sendGuess({ points, board })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Guesses);