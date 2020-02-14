import React from 'react';
import { connect } from 'react-redux';
import { createPlayer, logOutPlayer } from '../../actions/playerActions';

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
    this.props.createPlayer(this.state);
  }

  logOut = event => {
    event.preventDefault();
    this.props.logOutPlayer(this.props.currentPlayer);
  }

  render() {
    if (this.props.currentPlayer) {
      return <button className="logout" onClick={this.logOut}>log out</button>;
    } else return (
      <>
        <h2>fuddll</h2>
        <form onSubmit={event => this.handleSubmit(event)}>
          <input type="text" name="name" value={this.state.name} placeholder="username:" onChange={event => this.handleChange(event)} /><br />
          <input type="password" name="password" value={this.state.password} placeholder="password:" onChange={event => this.handleChange(event)} /><br />
          <input type="submit" value="submit" class="submit" />
        </form>
      </>
    );
  }
}

const mapStateToProps = ({ players }) => ({
  currentPlayer: players.currentPlayer,
});

const mapDispatchToProps = dispatch => {
  return {
    createPlayer: player => dispatch(createPlayer(player)),
    logOutPlayer: player => dispatch(logOutPlayer(player)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);