export function createPlayer(formData) {
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }, 
    body: JSON.stringify(formData)
  };

  return dispatch => {
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
        dispatch({ type: 'LOGIN_PLAYER', player: player });
        sessionStorage.setItem("userId", player.id);
      })
      .catch(error => console.log(error));
  };
};

export function logPlayerToLobby() {  
  if (sessionStorage.getItem('userId')) {
    const player = { user_id: parseInt(sessionStorage.getItem('userId')) };

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }, 
      body: JSON.stringify(player)
    };
  
    fetch('/players', configObj);
  }
}