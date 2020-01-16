import React from 'react';

class Point extends React.Component {
  handleClick = (event) => {
    if(event.target.checked) {
      this.props.connectPoints(this.props.point);
    } else {
      this.props.removePoint(this.props.point);
    }
  }
  
  render() {
    return (
      <div className="point">
        <div className="checkbox">
          <button onClick={this.handleClick} value="x" />
        </div>
      </div>
    );
  }
}

export default Point;