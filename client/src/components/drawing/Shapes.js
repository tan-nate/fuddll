import React from 'react';
import { connect } from 'react-redux';
import { broadcastFuddll } from '../../actions/gameActions';

import Shape from '../drawing/Shape';

class Shapes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shapes: []
    };
  }

  componentDidUpdate() {
    this.fitSvgs();
  }

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
      const points = [...lines.map(line => line.point1_id), ...lines.map(line => line.point2_id)];
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
    const shuffle = function(array) {
      let currentIndex = array.length;
      let temporaryValue
      let randomIndex
    
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
    
      return array;
    };

    if (this.props.filteredLines().length !== 0) {
      const foundPoints = [];
      foundPoints.push(this.isolateShape(this.props.filteredLines()[0]));
      let flatFoundPoints = foundPoints.flat();
      let unfoundLines = this.props.filteredLines().filter(line => !flatFoundPoints.includes(line.point1_id) && !flatFoundPoints.includes(line.point2_id));
      while (unfoundLines.length !== 0) {
        foundPoints.push(this.isolateShape(unfoundLines[0]));
        flatFoundPoints = foundPoints.flat();
        // eslint-disable-next-line
        unfoundLines = this.props.filteredLines().filter(line => !flatFoundPoints.includes(line.point1_id) && !flatFoundPoints.includes(line.point2_id));
      }

      return shuffle(foundPoints);
    }
  }

  groupLinesByShapeAndSendToCanvas = () => {
    const shapes = this.isolateAllShapes().map(shape => this.props.filteredLines().filter(line => shape.includes(line.point1_id) || shape.includes(line.point2_id)));
    this.setState({ shapes: shapes });
  }

  renderShapes = () => {
    return this.state.shapes.map(shape => <Shape key={this.state.shapes.indexOf(shape)} shape={shape} />);
  }

  fitSvgs = () => {
    function resizeSVG(svg) {
      const bbox = svg.getBBox();
      svg.setAttribute("viewBox", `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
      svg.setAttribute("width", `${bbox.width}`);
      svg.setAttribute("height", `${bbox.height}`);
    }

    const svgs = document.getElementsByClassName("rotate-svg");
    Array.prototype.forEach.call(svgs, svg => {
      resizeSVG(svg);
    });
  }

  handleClick = event => {
    event.preventDefault();
    this.groupLinesByShapeAndSendToCanvas();
    broadcastFuddll(this.props.board.id);
  }
  
  render() {
    return (
      <div className="shapes">
        <div className="toolbox" data-hidden={this.checkLinesLeftAndShapesClosed()}>
          <div className="lines-left" hidden={this.props.filteredLines().length === 12}>
            {this.linesLeft()}
          </div>
          <div className="instructions" hidden={this.checkShapesClosed()}>
            <p>
              close shapes
            </p>
          </div>
          <button className="submit" type="submit" disabled={!this.checkLinesLeftAndShapesClosed()} onClick={event => this.handleClick(event)}>fuddl</button>
        </div>
        <div className="rotated-shapes-svg">
          {this.renderShapes()}
        </div>
      </div>
    );
  }
}

Shapes.defaultProps = {
  board: { id: null }
};

const mapStateToProps = ({ lines }) => ({
  lines,
});

export default connect(mapStateToProps)(Shapes);