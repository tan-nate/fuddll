import React from 'react';
import { connect } from 'react-redux';
import { broadcastFuddll } from '../../actions/gameActions';

class Toolbox extends React.Component {
  checkPointForLines = (point) => {
    return this.props.filteredLines().filter(line => line.point1_id === point.id || line.point2_id === point.id);
  }
  
  checkShapesClosed = () => {
    const checkPointsArray = this.props.filteredPoints().map(point => {
      if (this.checkPointForLines(point).length !== 0) {
        if (this.checkPointForLines(point).length === 2) {
          return 1;
        } else {
          return 0;
        }
      } else {
        return 1;
      }
    });
    if (checkPointsArray.includes(0)) {
      return false;
    } else {
      return true;
    }
  }
  
  checkLinesLeftAndShapesClosed = () => {
    if (this.props.lines.length !== 0) {
      if (this.checkShapesClosed() && this.props.filteredLines().length === 12) {
        return true;
      } else {
        return false;
      }
    }
  }

  linesLeft = () => {
    if (12 - this.props.filteredLines().length === 1) {
      return <p>{12 - this.props.filteredLines().length} line left</p>;
    } else if (12 - this.props.filteredLines().length < 0) {
      return <p>{this.props.filteredLines().length - 12} too many lines</p>;
    } else {
      return <p>{12 - this.props.filteredLines().length} lines left</p>;
    }
  }

  handleClick = event => {
    event.preventDefault();
    broadcastFuddll(this.props.board.id);
    this.props.setFuddllSent();
  }
  
  render() {
    return (
      <div className="toolbox" data-hidden={this.checkLinesLeftAndShapesClosed()}>
        <div className="lines-left" hidden={this.props.filteredLines().length === 12}>
          {this.linesLeft()}
        </div>
        <div className="instructions" hidden={this.checkShapesClosed()}>
          <p>
            close shapes
          </p>
        </div>
        <button className="submit" type="submit" disabled={!this.checkLinesLeftAndShapesClosed()} onClick={event => this.handleClick(event)}>fuddl</button>
      </div>
    );
  }
}

Toolbox.defaultProps = {
  board: { id: null }
};

const mapStateToProps = ({ lines }) => ({
  lines,
});

export default connect(mapStateToProps)(Toolbox);