export function fetchBoards() {
  return dispatch => {
    fetch('http://localhost:3000/boards')
      .then(response => response.json())
      .then(boards => dispatch({ type: 'ADD_BOARDS', boards: boards }));
  };
};

export function fetchPoints() {
  return dispatch => {
    fetch('http://localhost:3000/points')
      .then(response => response.json())
      .then(points => dispatch({ type: 'ADD_POINTS', points: points }));
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