import React from 'react';
import { connect } from 'react-redux';
import { fetchPoints } from '../actions/gameActions';
import Point from '../components/Point';

class Board extends React.Component {
  filteredPoints = () => {
    if(this.props.board !== undefined) {
      return this.props.points.filter(point => point.board_id === this.props.board.id);
    } else {
      return [];
    }
  }

  renderPoints = () => {
    if(this.filteredPoints().length !== 0) {
      return this.filteredPoints().map(point => <Point point={point} />)
    } else {
      return null;
    }
  }
  
  render() {
    return (
      <div className="board">
        {this.renderPoints()}
      </div>
    );
  }
}

const mapStateToProps = ({ points }) => ({ points });

export default connect(mapStateToProps)(Board);