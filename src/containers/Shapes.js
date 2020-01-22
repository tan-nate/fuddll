import React from 'react';
import { connect } from 'react-redux';

class Shapes extends React.Component {
  filteredLines = () => {
    return this.props.lines.filter(line => line.board_id === this.props.board.id);
  }

  isolateShape = (firstLine) => {
    const includedPoints = [];
    const linesConnectedToPoint = (point) => {
      return this.filteredLines().filter(line => line.point1_id === point || line.point2_id === point);
    }
    const findUnincludedPoint = (lines) => {
      const points = [...lines.map(line => line.point1_id), ...lines.map(line => line.point1_id)];
      return points.find(point => !includedPoints.includes(point));
    }

    let unincludedPoint = firstLine.point1_id;
    while (unincludedPoint !== undefined) {
      includedPoints.push(unincludedPoint);
      unincludedPoint = findUnincludedPoint(linesConnectedToPoint(unincludedPoint));
    }

    return includedPoints;
  }

  isolateAllShapes = () => {
    if (this.filteredLines().length !== 0) {
      const foundPoints = [];
      foundPoints.push(this.isolateShape(this.filteredLines()[0]));
      let flatFoundPoints = foundPoints.flat();
      let unfoundLines = this.filteredLines().filter(line => !flatFoundPoints.includes(line.point1_id) && !flatFoundPoints.includes(line.point2_id));
      while (unfoundLines.length !== 0) {
        foundPoints.push(this.isolateShape(unfoundLines[0]));
        flatFoundPoints = foundPoints.flat();
        unfoundLines = this.filteredLines().filter(line => !flatFoundPoints.includes(line.point1_id) && !flatFoundPoints.includes(line.point2_id));
      }
      return foundPoints;
    } else {
      return null;
    }
  }

  showShapes = () => {
    if (this.props.board !== undefined) {
      if (this.props.showingShapes.includes(this.props.board.id)) {
        return <p>{JSON.stringify(this.isolateAllShapes())}</p>;
      }
    }
  }
  
  render() {
    return (
      <div>
        {this.showShapes()}
      </div>
    );
  }
}

const mapStateToProps = ({ points, lines }) => ({
  points: points.points, 
  pointPositions: points.pointPositions, 
  lines 
});

export default connect(mapStateToProps)(Shapes);