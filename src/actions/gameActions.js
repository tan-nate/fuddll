export function fetchBoards() {
  return dispatch => {
    fetch('http://localhost:3000/boards')
      .then(response => response.json())
      .then(boards => dispatch({ type: 'ADD_BOARDS', boards: boards }));
  };
};

export function fetchSpaces() {
  return dispatch => {
    fetch('http://localhost:3000/spaces')
      .then(response => response.json())
      .then(spaces => dispatch({ type: 'ADD_SPACES', spaces: spaces }));
  };
}

export function placeShip({ id, shipType }) {
  let data = { id, shipType }
  
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  }

  return dispatch => {
    fetch(`http://localhost:3000/spaces/${id}`, configObj)
      .then(response => response.json())
      .then(ship => dispatch({ type: 'PLACE_SHIP', ship: ship }));
  };
};