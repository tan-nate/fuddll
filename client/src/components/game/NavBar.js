import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Players from './Players';
import Scoreboard from './Scoreboard';
import Auth from './Auth';

function NavBar() {
  return (
    <Router>
      <div>
        <h2>fuddll</h2>
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

export default NavBar;