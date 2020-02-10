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
    this.setState({
      players: [...this.state.players, JSON.parse(response)]
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