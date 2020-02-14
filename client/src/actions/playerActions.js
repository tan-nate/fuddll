export function fetchPlayers() {
  return dispatch => {
    const headers = {
      credentials: "include",
    }

    fetch('/players', headers)
      .then(response => response.json())
      .then(players => dispatch({ type: 'ADD_PLAYERS', players: players }));
  };
};

export function createPlayer(player) {
  const headers = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(player),
  };
  
  return () => {
    fetch('/players', headers)
      .then(response => {
        if (response.status === 204) {
          throw new Error("no content");
        } else {
          return response.json();
        }
      })
      .then(player => {
        if (player.error) {
          console.log(player.error);
        } else {
          window.location.reload();
          return false;
        }
      })
      .catch(console.log);
  }
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
        }
      })
      .catch(console.log);
  }
}