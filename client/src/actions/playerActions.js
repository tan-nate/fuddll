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
        localStorage.setItem("token", player.jwt);
        window.location.reload(false);
      })
      .catch(error => console.log(error));
  };
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
      .then(player => dispatch({ type: 'LOGIN_PLAYER', player }));
  }
}