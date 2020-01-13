import React from 'react';

class Point extends React.Component {
  render() {
    return (
    <div className="point">{this.props.point.id}</div>
    )
  }
}

export default Point;