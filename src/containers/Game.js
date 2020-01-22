import React from 'react';
import { connect } from 'react-redux';
import { fetchBoards, fetchPoints } from '../actions/gameActions';
import Board from './Board';

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
        <Board board={this.props.boards[0]} points={this.props.points} />
        <h2>opponent</h2>
        <Board board={this.props.boards[1]} points={this.props.points} />
      </>
    );
  }
}

const mapStateToProps = ({ boards, points }) => ({ boards, points });

const mapDispatchToProps = dispatch => {
  return {
    fetchBoards: () => dispatch(fetchBoards()),
    fetchPoints: () => dispatch(fetchPoints())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);