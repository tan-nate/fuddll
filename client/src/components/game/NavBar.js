import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { connect } from 'react-redux';

import Players from './Players';
import Scoreboard from './Scoreboard';
import Auth from './Auth';

import ActionCable from 'actioncable';

class NavBar extends React.Component {
  componentDidMount() {
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    cable.subscriptions.create({
      channel: 'RequestsChannel', 
      player: this.props.currentPlayer.id,
    }, {
      received: response => {this.handleReceived(response)},
    });
  }

  handleReceived = (response) => {
    console.log(response);
  }
  
  render() {
    return (
      <Router>
        <div>
          <h1>fuddll</h1>
          <Link to="/">lobby</Link>
          <Link to="/scoreboard">scoreboard</Link>
          <Auth />
          <hr />
          <Switch>
            <Route exact path="/">
              <Players />
            </Route>
            <Route path="/scoreboard">
              <Scoreboard />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ players }) => ({
  currentPlayer: players.currentPlayer,
})

export default connect(mapStateToProps)(NavBar);