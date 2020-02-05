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