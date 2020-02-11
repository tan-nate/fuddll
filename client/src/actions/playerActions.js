export function createPlayer(formData) {
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }, 
    body: JSON.stringify(formData)
  };

  
  fetch('/players', configObj)
    .then(response => {
      if (!response.ok) {
        return response.json()
        .then(json => {
          throw Error(json.errors.toString());
        })
      }
      
      return response.json();
    })
    .then(player => {
      localStorage.setItem("token", player.jwt);
      window.location.reload(false);
    })
    .catch(error => console.log(error));
};

export function autoLogin() {
  const token = localStorage.getItem("token");

  let configObj = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  return dispatch => {
    fetch('/auto_login', configObj)
      .then(resp => resp.json())
      .then(player => dispatch({ type: 'LOGIN_PLAYER', player: JSON.parse(player.player) }));
  }
}

export function fetchPlayers() {
  return dispatch => {
    fetch('/players')
      .then(response => response.json())
      .then(players => dispatch({ type: 'ADD_PLAYERS', players: players }));
  };
};