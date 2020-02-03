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
    fetch('http://localhost:3000/players', configObj)
      .then(response => response.json())
      .then(player => dispatch({ type: 'LOGIN_PLAYER', player: player }))
      .catch(() => console.log("Something went wrong"));
  };
};