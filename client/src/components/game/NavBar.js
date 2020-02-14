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
        <ul>
          <li>
            <Link to="/">lobby</Link>
          </li>
          <li>
            <Link to="/scoreboard">scoreboard</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route exact path="/">
            <Players />
          </Route>
          <Route path="/scoreboard">
            <Scoreboard />
          </Route>
        </Switch>
        <Auth />
      </div>
    </Router>
  );
}

export default NavBar;