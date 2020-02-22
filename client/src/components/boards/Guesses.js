import React from 'react';
import { connect } from 'react-redux';
import { sendGuess, fetchGuesses } from '../../actions/guessingActions';
import { fetchPoints } from '../../actions/gameActions';


import GuessPoint from './GuessPoint';
import Guess from '../drawing/Guess';
import Shapes from '../drawing/Shapes';

class Guesses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connectedPoints: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.guesses > prevProps.guesses) {
      this.props.setWaitingTrue();
    }
  }

  componentDidMount() {
    this.props.fetchPoints(this.props.board.id);
    this.props.fetchGuesses(this.props.board.id);
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
      return this.filteredPoints().map(point => <GuessPoint key={point.id} point={point} connectPoints={this.connectPoints} removePoint={this.removePoint} connectedPoints={this.state.connectedPoints} waiting={this.props.waiting} />);
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

  filteredLines = () => {
    if (this.props.lines.length !== 0 && this.props.board !== undefined) {
      return this.props.lines.filter(line => line.board_id === this.props.board.id);
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

  renderShapes = () => {
    if (this.filteredLines().length > 0) {
      return <Shapes board={this.props.board} filteredLines={this.filteredLines} />
    }
  }

  render() {
    if (this.props.waiting) {
      return (
        <div className="board-container">
          <div className="board">
            {this.renderPoints()}
            {this.renderGuesses()}
          </div>
          <div className="toolbox countdown waiting">
            <p>wait</p>
          </div>
          <br />
          {this.renderShapes()}
        </div>
      );
    } else if (this.props.guessCount <= 10) {
      return (
        <div className="board-container">
          <div className="board">
            {this.renderPoints()}
            {this.renderGuesses()}
          </div>
          <div className="toolbox countdown warning">
            <p>{this.props.guessCount}</p>
          </div>
          <br />
          {this.renderShapes()}
        </div>
      );
    } else {
      return (
        <div className="board-container">
          <div className="board">
            {this.renderPoints()}
            {this.renderGuesses()}
          </div>
          <div className="toolbox countdown">
            <p>{this.props.guessCount}</p>
          </div>
          <br />
          {this.renderShapes()}
        </div>
      );
    }
  }
}

const mapStateToProps = ({ points, guesses, guessPointPositions, lines }) => ({
  points: points.points, 
  guesses,
  guessPointPositions,
  lines,
});

const mapDispatchToProps = dispatch => {
  return {
    sendGuess: ({ points, board }) => dispatch(sendGuess({ points, board })),
    fetchPoints: boardId => dispatch(fetchPoints(boardId)),
    fetchGuesses: boardId => dispatch(fetchGuesses(boardId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Guesses);