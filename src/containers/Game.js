import React from 'react';
import { connect } from 'react-redux';
import { fetchBoards, fetchPoints, fetchLines } from '../actions/gameActions';
import Board from './Board';
import Shapes from './Shapes';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingShapes: []
    };
  }

  componentDidMount() {
    this.props.fetchBoards();
    this.props.fetchPoints();
    this.props.fetchLines();
  }

  showShapes = (boardId) => {
    this.setState({
      showingShapes: [...this.state.showingShapes, boardId]
    });
  }

  render() {
    return (
      <>
        <h1>fuddll</h1>
        <h2>natedogg</h2>
        <Board board={this.props.boards[0]} showShapes={this.showShapes} />
        <Shapes board={this.props.boards[1]} showingShapes={this.state.showingShapes} />
        <h2>opponent</h2>
        <Board board={this.props.boards[1]} showShapes={this.showShapes} />
        <Shapes board={this.props.boards[0]} showingShapes={this.state.showingShapes} />
      </>
    );
  }
}

const mapStateToProps = ({ boards }) => ({ boards });

const mapDispatchToProps = dispatch => {
  return {
    fetchBoards: () => dispatch(fetchBoards()),
    fetchPoints: () => dispatch(fetchPoints()),
    fetchLines: () => dispatch(fetchLines())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);