import React from 'react';
import { connect } from 'react-redux';
import { storeGuessPointPosition } from '../../actions/guessingActions';

class GuessPoint extends React.Component {
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

  passPointPosition = () => {
    const x = this.pointRef.current.getBoundingClientRect().x + this.pointRef.current.getBoundingClientRect().width / 2 + window.scrollX;
    const y = this.pointRef.current.getBoundingClientRect().y + this.pointRef.current.getBoundingClientRect().height / 2 + window.scrollY;
    this.props.storeGuessPointPosition({ point_id: this.props.point.id, board_id: this.props.point.board_id, x, y });
  }

  handleClick = () => {
    if (this.state.buttonColor === "blank") {
      this.props.connectPoints(this.props.point);
      this.setState({
        buttonColor: "blue"
      });
    } else if (this.state.buttonColor === "blue") {
      this.props.removePoint(this.props.point);
    }
  }
  
  render() {
    return (
      <div className="point">
        <div className="button" ref={this.pointRef}>
          <button onClick={this.handleClick} className={this.state.buttonColor}></button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeGuessPointPosition: point => dispatch(storeGuessPointPosition(point)),
  };
};

export default connect(null, mapDispatchToProps)(GuessPoint);