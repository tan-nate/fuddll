import React from 'react';
import { createPlayer } from '../actions/playerActions';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.createPlayer(this.state);
  }

  render() {
    return (
      <form>
        <input type="text" name="name" value={this.state.name} onChange={event => this.handleChange(event)} onSubmit={event => this.handleSubmit(event)} />
        <input type="text" name="password" value={this.state.password} />
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