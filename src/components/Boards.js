import React from 'react';

class Boards extends React.Component {
  renderBoards = () => {
    return this.props.boards.map(board => <li key={board.id}>{board.id}</li>)
  }
  
  render() {
    console.log(this.props.boards);
    return (
      <ul>
        {this.renderBoards()}
      </ul>
    );
  }
}

export default Boards;