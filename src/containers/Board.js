import React from 'react';
import Space from '../components/Space';

class Board extends React.Component {
  renderSpaces = () => {
    return this.props.board.spaces.map(space => {
      <Space id={space.id} />
    })
  }
  
  render() {
    return (
      <div className="board">
        {this.renderSpaces()}
      </div>
    );
  }
}

export default Board;