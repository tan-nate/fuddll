import React from 'react';

class Point extends React.Component {
  constructor(props) {
    super(props);
    this.state = { buttonColor: "blank" };
  }
  
  handleClick = (event) => {

  }
  
  render() {
    return (
      <div className="point">
        <div className="button">
          <button onClick={this.handleClick} className={this.state.buttonColor} />
        </div>
      </div>
    );
  }
}

export default Point;