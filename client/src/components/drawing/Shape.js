import React from 'react';

function Shape(props) {
  const shape = props.shape;
  const scale = 50;
  const randomAngle = (Math.floor(Math.random() * 4)) * 45;
  const rotation = `rotate(${randomAngle})`;
  const svglines = shape.map(line => <line key={line.id} className="line" x1={line.point1.x * scale} x2={line.point2.x * scale} y1={line.point1.y * scale} y2={line.point2.y * scale} />);
  return (
    <svg className="rotate-svg" transform={rotation}>
      <g transform={rotation}>
        {svglines}
      </g>
    </svg>
  );
}

export default Shape;