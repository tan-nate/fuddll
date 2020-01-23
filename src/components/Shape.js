import React from 'react';

function Shape(props) {
  const shape = props.shape;
  const scale = 50;
  const svglines = shape.map(line => <line className="line" x1={line.point1.x * scale} x2={line.point2.x * scale} y1={line.point1.y * scale} y2={line.point2.y * scale} />);
  return (<svg className="rotate-svg">{svglines}</svg>);
}

export default Shape;