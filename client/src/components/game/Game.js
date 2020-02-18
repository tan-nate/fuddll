import React from 'react';
import { connect } from 'react-redux';
import { fetchPoints, fetchLines } from '../../actions/gameActions';
import { fetchGuesses } from '../../actions/guessingActions';
import Board from '../boards/Board';
import Guesses from '../boards/Guesses';

class Game extends React.Component {
  componentDidMount() {
    this.props.fetchPoints(this.props.boards[0]);
    this.props.fetchPoints(this.props.boards[1]);
    this.props.fetchLines(this.props.boards[0]);
    this.props.fetchLines(this.props.boards[1]);
    this.props.fetchGuesses(this.props.boards[0]);
    this.props.fetchGuesses(this.props.boards[1]);
  }

  render() {
    return (
      <>
        <Board board={this.props.boards[0]} />
        <Guesses board={this.props.boards[1]} />
      </>
    );
  }
}

const mapStateToProps = ({ boards }) => ({ boards });

const mapDispatchToProps = dispatch => {
  return {
    fetchPoints: boardId => dispatch(fetchPoints(boardId)),
    fetchLines: boardId => dispatch(fetchLines(boardId)),
    fetchGuesses: boardId => dispatch(fetchGuesses(boardId)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);