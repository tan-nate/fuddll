import React from 'react';
import { connect } from 'react-redux';
import { fetchBoards, fetchPoints, fetchLines } from '../actions/gameActions';
import Board from './Board';
import Guesses from './Guesses';

class Game extends React.Component {
  componentDidMount() {
    this.props.fetchBoards();
    this.props.fetchPoints();
    this.props.fetchLines();
  }

  render() {
    return (
      <>
        <h1>fuddll</h1>
        <h2>natedogg</h2>
        <Board board={this.props.boards[0]} />
        <Guesses board={this.props.boards[1]} />
        <h2>opponent</h2>
        <Board board={this.props.boards[1]} />
        <Guesses board={this.props.boards[0]} />
      </>
    );
  }
}

const mapStateToProps = ({ boards }) => ({ boards });

const mapDispatchToProps = dispatch => {
  return {
    fetchBoards: () => dispatch(fetchBoards()),
    fetchPoints: () => dispatch(fetchPoints()),
    fetchLines: () => dispatch(fetchLines())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);