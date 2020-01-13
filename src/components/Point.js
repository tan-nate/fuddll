import React from 'react';

class Point extends React.Component {
  render() {
    return (
      <div className="point">
        {this.props.point.id}
        <br />
        .
      </div>
    );
  }
}

export default Point;