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
    this.clearRed();
  }

  checkForLines = () => {
    return this.props.lines.filter(line => line.point1_id === this.props.point.id || line.point2_id === this.props.point.id);
  }

  clearRed = () => {
    if (this.state.buttonColor === "red") {
      setTimeout(() => {
        this.setState({ buttonColor: "blank" })
      }, 3000);
    }
  }

  handleClick = () => {
    const lines = this.checkForLines();
    if (lines.length === 0) {
      if (this.state.buttonColor === "blank") {
        this.props.connectPoints(this.props.point);
        this.setState({
          buttonColor: "green"
        });
      } else if (this.state.buttonColor === "green") {
        this.props.removePoint(this.props.point);
        this.setState({
          buttonColor: "blank"
        });
      }
    } else if (lines.length === 1) {
      if (this.state.buttonColor === "blank") {
        this.props.connectPoints(this.props.point);
        this.setState({
          buttonColor: "green"
        });
      } else if (this.state.buttonColor === "green") {
        this.props.removePoint(this.props.point);
        this.setState({
          buttonColor: "red"
        });
      } else if (this.state.buttonColor === "red") {
        this.props.deleteLines(this.props.point);
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
        this.props.deleteLines(this.props.point);
        this.setState({
          buttonColor: "blank"
        });
      }
    }
  }

  passPointPosition = () => {
    const x = this.pointRef.current.getBoundingClientRect().x + this.pointRef.current.getBoundingClientRect().width / 2;
    const y = this.pointRef.current.getBoundingClientRect().y + this.pointRef.current.getBoundingClientRect().height / 2;
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