import React from 'react';
import { connect } from 'react-redux';
import { createPlayer } from '../actions/playerActions';

class Login extends React.Component {
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
    this.props.createPlayer(this.state);
  }

  render() {
    return (
      <form onSubmit={event => this.handleSubmit(event)}>
        <input type="text" name="name" value={this.state.name} placeholder="username:" onChange={event => this.handleChange(event)} /><br />
        <input type="password" name="password" value={this.state.password} placeholder="password:" onChange={event => this.handleChange(event)} /><br />
        <input type="submit" />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPlayer: player => dispatch(createPlayer(player)),
  };
};

export default connect(null, mapDispatchToProps)(Login);