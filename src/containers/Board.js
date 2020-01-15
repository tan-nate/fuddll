import React from 'react';
import { connect } from 'react-redux';
import { sendPoints } from '../actions/gameActions';
import Point from '../components/Point';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connectedPoints: []
    };
  }
  
  filteredPoints = () => {
    if(this.props.board !== undefined) {
      return this.props.points.filter(point => point.board_id === this.props.board.id);
    } else {
      return [];
    }
  }

  renderPoints = () => {
    if(this.filteredPoints().length !== 0) {
      return this.filteredPoints().map(point => <Point key={point.id} ref="child" point={point} connectPoints={this.connectPoints} removePoint={this.removePoint} />);
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
    if(this.state.connectedPoints.length === 2) {
      this.props.sendPoints(this.state.connectedPoints);
      this.setState({
        connectedPoints: []
      });
    }
  }

  render() {
    return (
      <div className="board">
        {this.renderPoints()}
      </div>
    );
  }
}

const mapStateToProps = ({ points }) => ({ points });

const mapDispatchToProps = dispatch => {
  return {
    sendPoints: (points) => dispatch(sendPoints(points))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);