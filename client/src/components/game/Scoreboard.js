import React from 'react';

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    }
  }
  
  componentDidMount() {
    this.fetchScoreBoard();
  }
  
  fetchScoreBoard = () => {
    const headers = {
      credentials: "include",
    }
  
    fetch('/scoreboard', headers)
      .then(response => response.json())
      .then(players => {
        this.setState({
          players: players,
        })
      });
  }

  renderPlayers = () => {
    return this.state.players.map(player => 
      <li key={player.id} className="player-scoreboard">
        <p className="player-scoreboard-name">{player.name}</p>
        <p>{player.wins} W</p>
        <p>{player.losses} L</p>
      </li>
    );
  }

  render() {
    return (
      <ul className="player-list">
        {this.renderPlayers()}
      </ul>
    );
  }
}

export default Scoreboard;