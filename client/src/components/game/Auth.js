import React from 'react';
import { connect } from 'react-redux';
import { logOutPlayer } from '../../actions/playerActions';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      errors: [],
    }
  }

  createPlayer = player => {
    const headers = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(player),
    };
    
    fetch('/players', headers)
      .then(response => response.json())
      .then(player => {
        if (player.errors) {
          const errors = Object.keys(player.errors).map(error => {
            return error + ' ' + player.errors[error][0];
          })
          this.setState({
            errors: errors,
          })
        } else {
          window.location.reload();
          return false;
        }
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      errors: [],
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.createPlayer({ name: this.state.name, password: this.state.password });
  }

  renderErrors = () => {
    return this.state.errors.map(error => <p key={error.index} className="login-error">{error}</p>);
  }

  renderNameError = () => {
    if (this.state.name.length > 10) {
      return <p className="login-error">name must be less than 10 characters</p>;
    }
  }

  logOut = event => {
    event.preventDefault();
    this.props.logOutPlayer(this.props.currentPlayer);
  }

  render() {
    if (this.props.currentPlayer) {
      return (
        <div className="user-info">
          <p id="current-player-name">{this.props.currentPlayer.name}</p>
          <p>{this.props.currentPlayer.wins} W</p>
          <p>{this.props.currentPlayer.losses} L</p>
          <button className="logout" onClick={this.logOut}>log out</button>
        </div>
      );
    } else return (
      <>
        <h1>fuddll</h1>
        <form onSubmit={event => this.handleSubmit(event)}>
          <input type="text" name="name" value={this.state.name} placeholder="name:" onChange={event => this.handleChange(event)} /><br />
          <input type="password" name="password" value={this.state.password} placeholder="password:" onChange={event => this.handleChange(event)} /><br />
          <input type="submit" value="submit" className="submit" />
        </form>
        <div id="login-errors">
          {this.renderNameError()}
          {this.renderErrors()}
        </div>
        <p id="welcome-instruction">if this is your first time, fill out the form to sign up!</p>
      </>
    );
  }
}

const mapStateToProps = ({ players }) => ({
  currentPlayer: players.currentPlayer,
});

const mapDispatchToProps = dispatch => {
  return {
    logOutPlayer: player => dispatch(logOutPlayer(player)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);