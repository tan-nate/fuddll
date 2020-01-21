import React from 'react';
import { connect } from 'react-redux';
import { sendPoints } from '../actions/gameActions';
import Point from '../components/Point';
import Lines from './Lines';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connectedPoints: [],
      pointPositions = []
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

  renderLines = () => {
    return this.filteredLines().map(line => <Line key={line.id} line={line} pointPositions={this.state.pointPositions} />)
  }

  passPointPosition = (point) => {
    const newPointPositions = [...this.state.pointPositions, point];
    this.setState({
      pointPositions: newPointPositions
    });
  }

  render() {
    return (
      <div className="board">
        {this.renderPoints()}
      </div>
    );
  }
}

const mapStateToProps = ({ points, lines }) => ({ points, lines });

const mapDispatchToProps = dispatch => {
  return {
    sendPoints: ({ points, board }) => dispatch(sendPoints({ points, board }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);