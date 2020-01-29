import React from 'react';
import { connect } from 'react-redux';
import { sendGuess } from '../actions/guessingActions';
import GuessPoint from '../components/GuessPoint';

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

  render() {
    return (
      <div className="board-container">
        <div className="board">
          {this.renderPoints()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ points, guesses }) => ({
  points: points.points, 
  guesses,  
});

const mapDispatchToProps = dispatch => {
  return {
    sendGuess: ({ points, board }) => dispatch(sendGuess({ points, board })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Guesses);