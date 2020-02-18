import React from 'react';
import { connect } from 'react-redux';
import Board from '../boards/Board';
import Guesses from '../boards/Guesses';

class Game extends React.Component {
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

export default connect(mapStateToProps)(Game);