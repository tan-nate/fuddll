import React from 'react';
import { connect } from 'react-redux';
import { storePointPosition } from '../actions/drawingActions';

class GuessPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonColor: "blank"
    };
    this.pointRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.connectedPoints.length < prevProps.connectedPoints.length) {
      this.setState({ buttonColor: "blank" });
    }
  }

  handleClick = () => {
    if (this.state.buttonColor === "blank") {
      this.props.connectPoints(this.props.point);
      this.setState({
        buttonColor: "green"
      });
    } else if (this.state.buttonColor === "green") {
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
    storePointPosition: point => dispatch(storePointPosition(point))
  };
};

export default connect(null, mapDispatchToProps)(GuessPoint);