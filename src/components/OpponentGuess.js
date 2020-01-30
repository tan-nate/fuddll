import React from 'react';

class OpponentGuess extends React.Component {
  renderGuess = () => {
    if (this.props.pointPositions.length !== 0) {
      const point1Position = this.props.pointPositions.find(point => point.point_id === this.props.guess.point1_id);
      const point2Position = this.props.pointPositions.find(point => point.point_id === this.props.guess.point2_id);
      const x1 = point1Position.x;
      const y1 = point1Position.y;
      const x2 = point2Position.x;
      const y2 = point2Position.y;
      return <line className="line" x1={x1} y1={y1} x2={x2} y2={y2} />
    }
  }
  
  render() {
    return (
      <svg className="svg">
        {this.renderGuess()}
      </svg>
    );
  }
}

export default OpponentGuess;