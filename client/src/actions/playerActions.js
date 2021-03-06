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

export function acceptRequest({ accepterId, challengerId, gameId }) {
  const acceptRequestHeaders = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ accepter_id: accepterId, challenger_id: challengerId, game_id: gameId }),
  };

  fetch('/accept_request', acceptRequestHeaders)
    .then(response => response.json());
}

export function storeOpponent(opponent) {
  return dispatch => dispatch({ type: 'STORE_OPPONENT' , opponent: opponent });
}

export function declineRequest({ currentPlayerId, challengerId }) {
  const headers = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ current_player_id: currentPlayerId, challenger_id: challengerId }),
  };

  fetch('/decline_request', headers)
    .then(console.log);
}

export function broadcastInGame(playerId) {
  const headers = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ player_id: playerId }),
  };

  fetch('/broadcast_in_game', headers)
    .then(response => response.json())
    .then(console.log);
}