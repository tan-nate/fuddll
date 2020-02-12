import React from 'react';
import { connect } from 'react-redux';
import { createPlayer, removePlayer } from '../../actions/playerActions';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    createPlayer(this.state);
  }

  logOut = () => {
    localStorage.clear();
    window.location.reload(false);
  }

  render() {
    if (localStorage.getItem('token')) {
      return <button className="logout" onClick={this.logOut}>log out</button>;
    } else return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <input type="text" name="name" value={this.state.name} placeholder="username:" onChange={event => this.handleChange(event)} /><br />
        <input type="password" name="password" value={this.state.password} placeholder="password:" onChange={event => this.handleChange(event)} /><br />
        <input type="submit" />
      </form>
    );
  }
}

const mapStateToProps = ({ players }) => ({ players });

const mapDispatchToProps = dispatch => {
  return {
    removePlayer: player => removePlayer(player),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);