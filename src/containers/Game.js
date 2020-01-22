import React from 'react';
import { connect } from 'react-redux';
import { fetchBoards, fetchPoints } from '../actions/gameActions';
import Board from './Board';
import Shapes from './Shapes';

class Game extends React.Component {
  componentDidMount() {
    this.props.fetchBoards();
    this.props.fetchPoints();
  }

  render() {
    return (
      <>
        <h1>fuddll</h1>
        <h2>natedogg</h2>
        <Board board={this.props.boards[0]} />
        <Shapes board={this.props.boards[1]} />
        <h2>opponent</h2>
        <Board board={this.props.boards[1]} />
        <Shapes board={this.props.boards[0]} />
      </>
    );
  }
}

const mapStateToProps = ({ boards }) => ({ boards });

const mapDispatchToProps = dispatch => {
  return {
    fetchBoards: () => dispatch(fetchBoards()),
    fetchPoints: () => dispatch(fetchPoints())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);