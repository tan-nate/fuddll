import React from 'react';
import { ActionCable } from 'react-actioncable-provider';

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    }
  }
  
  handleReceivedPlayer = response => {
    this.setState({
      players: [...this.state.players, JSON.parse(response)]
    });
  }

  renderPlayers = () => {
    return (
      <ul>
        {this.state.players.map(player => <li>{player.name}</li>)}
      </ul>
    );
  }

  render() {
    return (
      <div className="players-list">
        <ActionCable channel={{ channel: 'PlayersChannel' }} onReceived={this.handleReceivedPlayer} />
        {this.renderPlayers()}
      </div>
    );
  }
}

export default Players;