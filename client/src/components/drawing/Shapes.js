import React from 'react';

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
  
  render() {
    this.groupLinesByShapeAndSendToCanvas()
    return (
      <div className="shapes">
        <div className="rotated-shapes-svg">
          {this.renderShapes()}
        </div>
      </div>
    );
  }
}

export default Shapes;