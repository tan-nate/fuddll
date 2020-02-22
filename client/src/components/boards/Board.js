import React from 'react';
import { connect } from 'react-redux';
import { sendPoints, deleteLine } from '../../actions/drawingActions';
import { fetchPoints, fetchLines } from '../../actions/gameActions';

import Point from './Point';
import Line from '../drawing/Line';
import Toolbox from '../drawing/Toolbox';
import OpponentGuess from './OpponentGuess';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connectedPoints: []
    };
  }

  componentDidMount() {
    this.props.fetchPoints(this.props.board.id)
    this.props.fetchLines(this.props.board.id)
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
      return this.filteredPoints().map(point => <Point key={point.id} point={point} connectPoints={this.connectPoints} removePoint={this.removePoint} lines={this.filteredLines()} connectedPoints={this.state.connectedPoints} deleteLines={this.deleteLines} fuddlling={this.props.fuddlling} />);
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
      return this.filteredGuesses().map(guess => <OpponentGuess key={guess.id} guess={guess} pointPositions={this.filteredPointPositions()} board={this.props.board} storeHit={this.props.storeHit} />);
    }
  }

  render() {
    if (this.props.fuddlling) {
      return (
        <div className="board-container">
          <div className="board">
            {this.renderPoints()}
            {this.renderLines()}
            {this.renderGuesses()}
          </div>
        </div>
      );
    }
    return (
      <div className="board-container">
        <div className="board">
          {this.renderPoints()}
          {this.renderLines()}
          {this.renderGuesses()}
        </div>
        <Toolbox board={this.props.board} filteredPoints={this.filteredPoints} filteredLines={this.filteredLines} setFuddllSent={this.props.setFuddllSent} fuddllCount={this.props.fuddllCount} />
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
    fetchPoints: boardId => dispatch(fetchPoints(boardId)),
    fetchLines: boardId => dispatch(fetchLines(boardId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);