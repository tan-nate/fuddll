import React from 'react';

class Point extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonColor: "blank"
    };
    this.pointRef = React.createRef();
  }
  
  componentDidMount() {
    this.passPointPosition();
  }

  componentDidUpdate(prevProps) {
    if (this.props.connectedPoints.length < prevProps.connectedPoints.length) {
      this.setState({ buttonColor: "blank" });
    }
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

  passPointPosition = () => {
    const x = this.pointRef.current.getBoundingClientRect().x;
    const y = this.pointRef.current.getBoundingClientRect().y;
    this.props.passPointPosition({ point_id: this.props.point.id, board_id: this.props.point.board_id, x, y });
  }
  
  render() {
    return (
      <div className="point">
        <div className="button" ref={this.pointRef}>
          <button onClick={this.handleClick} className={this.state.buttonColor}>{this.props.point.id}</button>
        </div>
      </div>
    );
  }
}

export default Point;