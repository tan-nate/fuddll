import React from 'react';
import { connect } from 'react-redux';
import { fetchSpaces } from '../actions/gameActions';
import Space from '../components/Space';

class Board extends React.Component {
  filteredSpaces = () => {
    if(this.props.board !== undefined) {
      return this.props.spaces.filter(space => space.board_id === this.props.board.id);
    } else {
      return [];
    }
  }

  renderSpaces = () => {
    if(this.filteredSpaces().length !== 0) {
      return this.filteredSpaces().map(space => <Space space={space} />)
    } else {
      return null;
    }
  }
  
  render() {
    return (
      <div className="board">
        {this.renderSpaces()}
      </div>
    );
  }
}

const mapStateToProps = ({ spaces }) => ({ spaces });

const mapDispatchToProps = dispatch => {
  return {
    fetchSpaces: () => dispatch(fetchSpaces())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);