import React from 'react';
import ActionCable from 'actioncable';

import { connect } from 'react-redux';
import { fetchPlayers } from '../../actions/playerActions';

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    };
  }

  componentDidMount() {
    // change to 'wss://fuddll.herokuapp.com/cable' in production
    // change to 'ws://localhost:3000/cable' in development
    this.props.fetchPlayers();
    this.setState({
      players: this.props.players,
    })
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    cable.subscriptions.create("PlayersChannel", {
      received: (response) => {this.handleReceived(response)},
    });
  }
  
  handleReceived = response => {
    const player = JSON.parse(response);
    if (!player.logged_in) {
      this.setState({
        players: this.state.players.filter(newPlayer => newPlayer.id !== player.id),
      })
    } else this.setState({
      players: [...this.state.players, player],
    });
  }

  renderPlayers = () => {
    return (
      <ul>
        {this.state.players.map(player => <li key={player.id}>{player.name}</li>)}
      </ul>
    );
  }

  render() {
    return (
      <div className="players-list">
        {this.renderPlayers()}
      </div>
    );
  }
}

const mapStateToProps = ({ players }) => ({ players })

const mapDispatchToProps = dispatch => {
  return {
    fetchPlayers: () => dispatch(fetchPlayers()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Players);