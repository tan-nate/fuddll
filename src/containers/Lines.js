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

  renderPoints = () => {
    if (this.filteredPoints().length !== 0) {
      return this.filteredPoints().map(point => <Point key={point.id} point={point} connectPoints={this.connectPoints} removePoint={this.removePoint} lines={this.props.lines} connectedPoints={this.state.connectedPoints} />);
    } else {
      return null;
    }
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