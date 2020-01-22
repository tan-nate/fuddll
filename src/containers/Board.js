import React from 'react';
import { connect } from 'react-redux';
import { sendPoints, deleteLine } from '../actions/gameActions';
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
      return this.filteredPoints().map(point => <Point key={point.id} point={point} connectPoints={this.connectPoints} removePoint={this.removePoint} lines={this.props.lines} connectedPoints={this.state.connectedPoints} passPointPosition={this.passPointPosition} deleteLines={this.deleteLines} checkForLines={this.checkPointForLines} />);
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
    return this.filteredLines().map(line => <Line key={line.id} line={line} pointPositions={this.filteredPointPositions()} />);
  }

  deleteLines = (point) => {
    this.setState({ connectedPoints: [] })
    const deletedLine = this.props.lines.find(line => line.point1_id === point.id || line.point2_id === point.id);
    this.props.deleteLine(deletedLine);
  }

  linesLeft = () => {
    return <p>{12 - this.filteredLines().length} lines left</p>
  }

  checkPointForLines = (point) => {
    return this.filteredLines().filter(line => line.point1_id === point.id || line.point2_id === point.id);
  }

  checkShapesClosed = () => {
    const checkPointsArray = this.filteredPoints().map(point => {
      if (this.checkPointForLines(point).length !== 0) {
        if (this.checkPointForLines(point).length === 2) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return 1;
      }
    });
    if (checkPointsArray.includes(0)) {
      return false;
    } else {
      return true;
    }
  }

  checkLinesLeftAndShapesClosed = () => {
    if (this.checkShapesClosed() && this.filteredLines().length === 12) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className="board-container">
        <div className="board">
          {this.renderPoints()}
          {this.renderLines()}
        </div>
        <div className="toolbox">
          <div className="lines-left">
            {this.linesLeft()}
          </div>
          <div className="instructions" hidden={this.checkShapesClosed()}>
            <p>
              close shapes
            </p>
          </div>
          <button className="submit" type="submit" disabled={!this.checkLinesLeftAndShapesClosed()}>fuddll</button>
        </div>
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
    storePointPosition: point => dispatch(storePointPosition(point)),
    deleteLine: line => dispatch(deleteLine(line))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);