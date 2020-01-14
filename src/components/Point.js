import React from 'react';

class Point extends React.Component {
  handleClick = (event) => {
    if(event.target.checked) {
      this.props.connectPoints(this.props.point);
    } else {
      this.props.removePoint(this.props.point);
    }
  }

  isChecked = () => {
    if (this.props.connectPoints.includes(this.props.point.id)) {
      return true;
    } else {
      return false;
    }
  }
  
  render() {
    return (
      <div className="point">
        <div className="checkbox">
          <input onClick={this.handleClick} type="checkbox" checked={this.isChecked} />
        </div>
      </div>
    );
  }
}

export default Point;