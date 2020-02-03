import React from 'react';
import { connect } from 'react-redux';
import { createPlayer } from '../actions/playerActions';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      password_confirmation: "",
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
      <form>
        <input type="text" name="name" value={this.state.name} placeholder="username:" onChange={event => this.handleChange(event)} /><br />
        <input type="password" name="password" value={this.state.password} placeholder="password:" onChange={event => this.handleChange(event)} /><br />
        <input type="password" name="password_confirmation" value={this.state.password_confirmation} placeholder="confirm password:" onChange={event => this.handleChange(event)} /><br />
        <input type="submit" onSubmit={event => this.handleSubmit(event)} />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createPlayer: player => dispatch(createPlayer(player)),
  };
};

export default connect(null, mapDispatchToProps)(Signup);