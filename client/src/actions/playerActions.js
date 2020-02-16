export function fetchPlayers(currentPlayer) {
  return dispatch => {
    const headers = {
      credentials: "include",
    }

    fetch('/players', headers)
      .then(response => response.json())
      .then(players => dispatch({ type: 'ADD_PLAYERS', players: players, currentPlayer: currentPlayer }));
  };
};

export function getCurrentPlayer() {
  const headers = {
    credentials: "include",
  }

  return dispatch => {
    fetch('/get_current_player', headers)
      .then(response => response.json())
      .then(player => {
        if (player.error) {
          console.log(player.error);
        } else {
          dispatch({ type: 'LOGIN_PLAYER', player: player });
        }
      });
  };
};

export function addPlayer(player) {
  return dispatch => dispatch({ type: 'ADD_PLAYER', player: player });
}

export function removePlayer(player) {
  return dispatch => dispatch({ type: 'REMOVE_PLAYER', player: player });
}

export function logOutPlayer(player) {
  const headers = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(player),
  };

  return dispatch => {
    fetch(`/players/${player.id}`, headers)
      .then(response => response.json())
      .then(player => {
        if (player.error) {
          console.log(player.error);
        } else {
          dispatch({ type: 'LOGOUT_PLAYER', player: player.player });
          dispatch({ type: 'CLEAR_PLAYERS' });
        }
      })
      .catch(console.log);
  }
}

export function storeOpponent(opponent) {
  return dispatch => dispatch({ type: 'STORE_OPPONENT' , opponent: opponent });
}