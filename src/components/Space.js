import React from 'react';
import { connect } from 'react-redux';
import { placeShip } from '../actions/boardActions';

class Space extends React.Component {
  render() {
    return (
      <div className="space"></div>
    )
  }
}

const mapStateToProps = ({ spaces }) => ({ spaces });

const mapDispatchToProps = dispatch => ({
  placeShip: ({ id, shipType }) => dispatch(placeShip({ id, shipType }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Space);