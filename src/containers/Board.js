import React from 'react';
import { connect } from 'react-redux';
import { sendPoints } from '../actions/gameActions';
import { storePointPosition } from '../actions/drawingActions';
import Point from '../components/Point';
import Line from '../components/Line';

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
      return this.filteredPoints().map(point => <Point key={point.id} point={point} connectPoints={this.connectPoints} removePoint={this.removePoint} lines={this.props.lines} connectedPoints={this.state.connectedPoints} passPointPosition={this.passPointPosition} />);
    } else {
      return null;
    }
  }

  passPointPosition = (point) => {
    this.props.storePointPosition(point);
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

  filteredLines = () => {
    return this.props.lines.filter(line => line.board_id === this.props.board.id);
  }

  filteredPointPositions = () => {
    return this.props.pointPositions.filter(pointPosition => pointPosition.board_id === this.props.board.id);
  }

  renderLines = () => {
    return this.filteredLines().map(line => <Line key={line.id} line={line} pointPositions={this.filteredPointPositions} />);
  }

  render() {
    return (
      <div className="board">
        {this.renderPoints()}
        {this.renderLines()}
      </div>
    );
  }
}

const mapStateToProps = ({ points, lines }) => ({
  points: points.points, 
  pointPositions: points.pointPositions, 
  lines 
});

const mapDispatchToProps = dispatch => {
  return {
    sendPoints: ({ points, board }) => dispatch(sendPoints({ points, board })),
    storePointPosition: point => dispatch(storePointPosition(point))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);