import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    }
  }
  
  handleReceived = response => {
    const player = JSON.parse(response);
    if (!player.logged_in) {
      this.setState({
        players: this.state.players.filter(newPlayer => newPlayer.id !== player.id),
      })
    } else this.setState({
      players: [...this.state.players, player]
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
        <ActionCableConsumer channel="PlayersChannel" onReceived={this.handleReceived}>
          {this.renderPlayers()}
        </ActionCableConsumer>
      </div>
    );
  }
}

export default Players;