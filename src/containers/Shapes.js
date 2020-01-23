import React from 'react';
import { connect } from 'react-redux';

class Shapes extends React.Component {
  checkPointForLines = (point) => {
    return this.props.filteredLines().filter(line => line.point1_id === point.id || line.point2_id === point.id);
  }

  checkShapesClosed = () => {
    const checkPointsArray = this.props.filteredPoints().map(point => {
      if (this.checkPointForLines(point).length !== 0) {
        if (this.checkPointForLines(point).length === 2) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return 1;
      }
    });
    if (checkPointsArray.includes(0)) {
      return false;
    } else {
      return true;
    }
  }

  checkLinesLeftAndShapesClosed = () => {
    if (this.props.lines.length !== 0) {
      if (this.checkShapesClosed() && this.props.filteredLines().length === 12) {
        return true;
      } else {
        return false;
      }
    }
  }

  linesLeft = () => {
    if (12 - this.props.filteredLines().length === 1) {
      return <p>{12 - this.props.filteredLines().length} line left</p>;
    } else if (12 - this.props.filteredLines().length < 0) {
      return <p>{this.props.filteredLines().length - 12} too many lines</p>;
    } else {
      return <p>{12 - this.props.filteredLines().length} lines left</p>;
    }
  }

  isolateShape = (firstLine) => {
    const includedPoints = [];
    const linesConnectedToPoint = (point) => {
      return this.props.filteredLines().filter(line => line.point1_id === point || line.point2_id === point);
    }
    const findUnincludedPoint = (lines) => {
      const points = [...lines.map(line => line.point1_id), ...lines.map(line => line.point1_id)];
      return points.find(point => !includedPoints.includes(point));
      debugger
    }

    let unincludedPoint = firstLine.point1_id;
    while (unincludedPoint !== undefined) {
      includedPoints.push(unincludedPoint);
      unincludedPoint = findUnincludedPoint(linesConnectedToPoint(unincludedPoint));
    }

    return includedPoints;
  }

  isolateAllShapes = () => {
    if (this.props.filteredLines().length !== 0) {
      const foundPoints = [];
      foundPoints.push(this.isolateShape(this.props.filteredLines()[0]));
      let flatFoundPoints = foundPoints.flat();
      let unfoundLines = this.props.filteredLines().filter(line => !flatFoundPoints.includes(line.point1_id) && !flatFoundPoints.includes(line.point2_id));
      while (unfoundLines.length !== 0) {
        foundPoints.push(this.isolateShape(unfoundLines[0]));
        flatFoundPoints = foundPoints.flat();
        unfoundLines = this.props.filteredLines().filter(line => !flatFoundPoints.includes(line.point1_id) && !flatFoundPoints.includes(line.point2_id));
      }
      return foundPoints;
    } else {
      return null;
    }
  }

  showShapes = () => {
    return <p>{JSON.stringify(this.isolateAllShapes())}</p>;
  }
  
  render() {
    return (
      <div className="toolbox" data-hidden={this.checkLinesLeftAndShapesClosed()}>
        <div className="lines-left" hidden={this.props.filteredLines().length === 12}>
          {this.linesLeft()}
        </div>
        <div className="instructions" hidden={this.checkShapesClosed()}>
          <p>
            close shapes
          </p>
        </div>
        <button className="submit" type="submit" disabled={!this.checkLinesLeftAndShapesClosed()} onClick={this.showShapes}>fuddl</button>
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