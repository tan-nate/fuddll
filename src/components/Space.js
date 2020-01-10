import React from 'react';

class Space extends React.Component {
  render() {
    return (
    <div className="space">{this.props.space.id}</div>
    )
  }
}

export default Space;