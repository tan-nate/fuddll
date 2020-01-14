import React from 'react';

class Point extends React.Component {
  handleClick = (event) => {
    if(event.target.checked) {
      this.props.connectPoints(this.props.point);
    } else {
      this.props.removePoint(this.props.point);
    }
    this.props.checkAndSendPoints();
  }
  
  render() {
    return (
      <div className="point">
        <div className="checkbox">
          <input onClick={this.handleClick} type="checkbox" />
        </div>
      </div>
    );
  }
}

export default Point;