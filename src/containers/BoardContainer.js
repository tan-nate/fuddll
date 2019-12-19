import React from 'react';
import { connect } from 'react-redux';
import { fetchBoards } from '../actions/boardActions';

class BoardContainer extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.fetchBoards();
  }

  render() {
    console.log(this.props.boards);
    return (
      <div></div>
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