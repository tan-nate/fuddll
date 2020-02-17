import React from 'react';
import ActionCable from 'actioncable';

import { connect } from 'react-redux';
import { fetchPlayers, addPlayer, removePlayer } from '../../actions/playerActions';

import Player from './Player';

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
    };
  }
  
  componentDidMount() {
    this.props.fetchPlayers(this.props.currentPlayer);
    // change to 'wss://fuddll.herokuapp.com/cable' in production
    // change to 'ws://localhost:3000/cable' in development
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    cable.subscriptions.create("PlayersChannel", {
      received: response => {this.handleReceived(response)},
    });
  }
  
  handleReceived = response => {
    const player = JSON.parse(response);
    if (!player.logged_in) {
      this.props.removePlayer(player);
    } else if (player.id !== this.props.currentPlayer.id) {
      this.props.addPlayer(player);
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  filteredPlayers = () => {
    return this.props.players.filter(player => {
      const regex = new RegExp(`^${this.state.filter}`);
      return regex.test(player.name);
    })
  }

  renderPlayers = () => {
    if (this.props.players.length > 0 && this.state.filter === '') {
      return (
        <>
          <input type="text" name="filter" value={this.state.filter} placeholder="filter:" onChange={event => this.handleChange(event)} />
          <ul className="player-list">
            {this.props.players.map(player => <Player key={player.id} currentPlayer={this.props.currentPlayer} player={player} />)}
          </ul>
        </>
      );
    } else if (this.state.filter !== '') {
      return (
        <>
          <input type="text" name="filter" value={this.state.filter} placeholder="filter:" onChange={event => this.handleChange(event)} />
          <ul className="player-list">
            {this.filteredPlayers().map(player => <Player key={player.id} player={player} />)}
          </ul>
        </>
      );
    } else {
      return (
        <p>no one is online</p>
      );
    }
  };

  render() {
    return (
      <>
        {this.renderPlayers()}
      </>
    );
  }
}

const mapStateToProps = ({ players }) => ({
  players: players.players,
  currentPlayer: players.currentPlayer,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchPlayers: currentPlayer => dispatch(fetchPlayers(currentPlayer)),
    addPlayer: player => dispatch(addPlayer(player)),
    removePlayer: player => dispatch(removePlayer(player)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Players);