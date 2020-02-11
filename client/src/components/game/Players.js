import React from 'react';
import ActionCable from 'actioncable';

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
    const cable = ActionCable.createConsumer('wss://fuddll.herokuapp.com/cable');
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

export default Players;