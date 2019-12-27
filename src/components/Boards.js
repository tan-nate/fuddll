import React from 'react';

class Boards extends React.Component {
  render() {
    console.log(this.props.boards);
    return (
      <div>
        <h2>Boards</h2>
        <ul>
        </ul>
      </div>
    );
  }
}

export default Boards;