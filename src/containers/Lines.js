import React from 'react';
import Point from '../components/Point';

class Lines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pointPositions = []
    };
  }

  passPointPosition = (point) => {
    const newPointPositions = [...this.state.pointPositions, point];
    this.setState({
      pointPositions: newPointPositions
    });
  }
  
  renderLines = () => {
    
  }

  render() {
    return (
      <>
        {this.props.renderPoints()}
      </>
    );
  }
}

export default Lines;