import React from 'react';

class Line extends React.Component {
  renderLine = () => {
    const point1Position = this.props.pointPositions.find(point => point.point_id === this.props.line.point1_id);
    const point2Position = this.props.pointPositions.find(point => point.point_id === this.props.line.point2_id);
    const x1 = point1Position.x;
    const y1 = point1Position.y;
    const x2 = point2Position.x;
    const y2 = point2Position.y;
    return <line className="line" x1={x1} y1={y1} x2={x2} y2={y2} />
  }
  
  render() {
    return (
      <svg id={this.props.line.id} className="svg">
        {this.renderLine()}
      </svg>
    );
  }
}

export default Line;