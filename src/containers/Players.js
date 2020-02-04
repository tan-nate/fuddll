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
      players: [...this.state.players, response]
    });
  }

  render() {
    return (
      <div className="players-list">
        <ActionCable channel={{ channel: 'PlayersChannel' }} onReceived={this.handleReceivedPlayer} />
      </div>
    );
  }
}

export default Players;