import React from 'react';
import { connect } from 'react-redux';

class OpponentGuess extends React.Component {
  componentDidMount() {
    this.setGuessColor();
  }
  
  filteredLines = () => {
    return this.props.lines.filter(line => line.board_id === this.props.board.id);
  }
  
  setGuessColor = () => {
    if (this.filteredLines().filter(line =>
      [line.point1_id, line.point2_id].every(point =>
        [this.props.guess.point1_id, this.props.guess.point2_id].includes(point)
      )
    ).length > 0) {
      return "aqua";
    } else {
      return "gray";
    }
  }
  
  renderGuess = () => {
    if (this.props.pointPositions.length !== 0) {
      const point1Position = this.props.pointPositions.find(point => point.point_id === this.props.guess.point1_id);
      const point2Position = this.props.pointPositions.find(point => point.point_id === this.props.guess.point2_id);
      const x1 = point1Position.x;
      const y1 = point1Position.y;
      const x2 = point2Position.x;
      const y2 = point2Position.y;
      return <line className={`line-${this.setGuessColor()}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
    }
  }
  
  render() {
    return (
      <svg className="svg">
        {this.renderGuess()}
      </svg>
    );
  }
}

const mapStateToProps = ({ lines }) => ({ lines });

export default connect(mapStateToProps)(OpponentGuess);