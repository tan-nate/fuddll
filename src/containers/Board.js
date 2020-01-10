import React from 'react';
import { connect } from 'react-redux';
import { fetchSpaces } from '../actions/boardActions';
import Space from '../components/Space';

class Board extends React.Component {
  componentDidMount() {
    this.props.fetchSpaces();
  }
  
  filteredSpaces = () => {
    if(this.props.board !== undefined) {
      return this.props.spaces.filter(space => space.board_id === this.props.board.id);
    } else {
      return [];
    }
  }

  renderSpaces = () => {
    return this.filteredSpaces().map(space => <Space space={space} />)
  }
  
  render() {
    console.log(this.props);
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