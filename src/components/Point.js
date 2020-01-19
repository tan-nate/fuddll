import React from 'react';

class Point extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonColor: "blank"
    };
  }

  checkForLines = () => {
    return this.props.lines.filter(line => line.point1_id === this.props.point.id || line.point2_id === this.props.point.id);
  }

  handleClick = () => {
    const lines = this.checkForLines();
    if (lines.length === 0 || lines.length === 1) {
      if (this.state.buttonColor === "blank") {
        this.props.connectPoints(this.props.point);
        this.setState({
          buttonColor: "green"
        });
      } else if (this.state.buttonColor === "green") {
        this.setState({
          buttonColor: "red"
        });
      } else if (this.state.buttonColor === "red") {
        this.props.removePoint(this.props.point);
        this.setState({
          buttonColor: "blank"
        });
      }
    } else if (lines.length === 2) {
      if (this.state.buttonColor === "blank") {
        this.setState({
          buttonColor: "red"
        });
      } else if (this.state.buttonColor === "red") {
        this.props.removePoint(this.props.point);
        this.setState({
          buttonColor: "blank"
        });
      }
    }
  }
  
  render() {
    return (
      <div className="point">
        <div className="button">
          <button onClick={this.handleClick} className={this.state.buttonColor}>{this.props.point.id}</button>
        </div>
      </div>
    );
  }
}

export default Point;