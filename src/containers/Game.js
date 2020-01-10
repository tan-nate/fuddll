import React from 'react';
import { connect } from 'react-redux';
import { fetchBoards, fetchSpaces } from '../actions/gameActions';
import Board from './Board';

class Game extends React.Component {
  componentDidMount() {
    this.props.fetchBoards();
    this.props.fetchSpaces();
  }

  render() {
    return (
      <div>
        <h2>Natedogg's Board</h2>
        <Board board={this.props.boards[0]} spaces={this.props.spaces} />
        <h2>Opponent's Board</h2>
        <Board board={this.props.boards[1]} spaces={this.props.spaces} />
      </div>
    );
  }
}

const mapStateToProps = ({ boards, spaces }) => ({ boards, spaces });

const mapDispatchToProps = dispatch => {
  return {
    fetchBoards: () => dispatch(fetchBoards()),
    fetchSpaces: () => dispatch(fetchSpaces())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);