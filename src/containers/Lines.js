import React from 'react';
import Point from '../components/Point';

class Lines extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pointPositions = []
    };
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