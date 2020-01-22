import React from 'react';
import { connect } from 'react-redux';

class Shapes extends React.Component {
  filteredLines = () => {
    return this.props.lines.filter(line => line.board_id === this.props.board.id);
  }

  isolateShape = () => {
    if (this.filteredLines().length !== 0) {
      const includedPoints = [];
      const linesConnectedToPoint = (point) => {
        return this.filteredLines().filter(line => line.point1_id === point || line.point2_id === point);
      }
      const findUnincludedPoint = (lines) => {
        const points = [...lines.map(line => line.point1_id), ...lines.map(line => line.point1_id)];
        return points.find(point => !includedPoints.includes(point));
      }

      let unincludedPoint = this.filteredLines()[0].point1_id;
      includedPoints.push(unincludedPoint);
      while (!unincludedPoint === undefined) {
        let unincludedPoint = findUnincludedPoint(linesConnectedToPoint(unincludedPoint));
        includedPoints.push(unincludedPoint);
      }

      return includedPoints;
    } else {
      return null;
    }
  }
  
  render() {
    return (
      <div>{this.isolateShape()}</div>
    );
  }
}

const mapStateToProps = ({ points, lines }) => ({
  points: points.points, 
  pointPositions: points.pointPositions, 
  lines 
});

export default connect(mapStateToProps)(Shapes);