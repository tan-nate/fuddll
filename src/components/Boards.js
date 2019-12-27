import React from 'react';

class Boards extends React.Component {
  renderBoards = () => {
    this.props.boards.map(board => <li>{board}</li>);
  }
  
  render() {
    return (
      <div>
        <h2>Boards</h2>
        <ul>
          {this.props.renderBoards}
        </ul>
      </div>
    );
  }
}

export default Boards;