import React from 'react';
import { connect } from 'react-redux';
import { fetchBoards } from '../actions/boardActions';
import Board from '../containers/Board';

class BoardsContainer extends React.Component {
  componentDidMount() {
    this.props.fetchBoards();
  }

  render() {
    return (
      <div>
        <h2>Natedogg's Board</h2>
        <Board board={this.props.boards[0]} />
        <h2>Opponent's Board</h2>
        <Board board={this.props.boards[1]} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boards
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBoards: () => dispatch(fetchBoards())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardsContainer);