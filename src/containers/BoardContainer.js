import React from 'react';
import { connect } from 'react-redux';
import { fetchBoards } from '../actions/boardActions';
import Board from '../components/Board';

class BoardContainer extends React.Component {
  componentDidMount() {
    this.props.fetchBoards();
  }

  render() {
    return (
      <div>
        <h2>Natedogg's Board</h2>
        <Board boards={this.props.boards} />
        <h2>Opponent's Board</h2>
        <Board boards={this.props.boards} />
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

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);