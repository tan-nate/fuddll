import React from 'react';
import { connect } from 'react-redux';
import { fetchBoards } from '../actions/boardActions';
import Boards from '../components/Boards';

class BoardContainer extends React.Component {
  componentDidMount() {
    this.props.fetchBoards();
  }

  render() {
    debugger
    return (
      <Boards boards={this.props.boards} />
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
    // boards are rendered correctly in BoardActions / fetchboards(). however not present in props.
    boards: () => dispatch(fetchBoards())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);