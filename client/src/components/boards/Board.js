import React from 'react';
import { connect } from 'react-redux';
import { sendPoints, deleteLine } from '/client/src/actions/drawingActions';
import Point from './Point';
import Line from '../drawing/Line';
import Shapes from '../drawing/Shapes';
import OpponentGuess from './OpponentGuess';

class Board extends React.Component {
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
      return this.filteredPoints().map(point => <Point key={point.id} point={point} connectPoints={this.connectPoints} removePoint={this.removePoint} lines={this.filteredLines()} connectedPoints={this.state.connectedPoints} deleteLines={this.deleteLines} />);
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
      this.props.sendPoints({ points: this.state.connectedPoints, board: this.props.board.id });
      this.setState({
        connectedPoints: []
      });
    }
  }

  filteredPointPositions = () => {
    return this.props.pointPositions.filter(pointPosition => pointPosition.board_id === this.props.board.id);
  }

  filteredLines = () => {
    if (this.props.lines.length !== 0 && this.props.board !== undefined) {
      return this.props.lines.filter(line => line.board_id === this.props.board.id);
    } else {
      return [];
    }
  }

  renderLines = () => {
    if (this.props.lines.length !== 0) {
      return this.filteredLines().map(line => <Line key={line.id} line={line} pointPositions={this.filteredPointPositions()} />);
    }
  }

  deleteLines = (point) => {
    this.setState({ connectedPoints: [] })
    const deletedLines = this.props.lines.filter(line => line.point1_id === point.id || line.point2_id === point.id);
    const deleteLine = this.props.deleteLine;
    deletedLines.forEach(line => deleteLine(line));
  }

  filteredGuesses = () => {
    if (this.props.guesses.length !== 0 && this.props.board !== undefined) {
      return this.props.guesses.filter(guess => guess.board_id === this.props.board.id);
    } else {
      return [];
    }
  }

  renderGuesses = () => {
    if (this.props.guesses.length !== 0) {
      return this.filteredGuesses().map(guess => <OpponentGuess key={guess.id} guess={guess} pointPositions={this.filteredPointPositions()} />);
    }
  }

  render() {
    return (
      <div className="board-container">
        <div className="board">
          {this.renderPoints()}
          {this.renderLines()}
          {this.renderGuesses()}
        </div>
        <Shapes board={this.props.board} filteredPoints={this.filteredPoints} filteredLines={this.filteredLines} />
      </div>
    );
  }
}

const mapStateToProps = ({ points, lines, guesses }) => ({
  points: points.points, 
  pointPositions: points.pointPositions, 
  lines,
  guesses, 
});

const mapDispatchToProps = dispatch => {
  return {
    sendPoints: ({ points, board }) => dispatch(sendPoints({ points, board })),
    deleteLine: line => dispatch(deleteLine(line)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);