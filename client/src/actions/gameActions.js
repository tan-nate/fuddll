export function fetchBoards() {
  return dispatch => {
    const headers = {
      credentials: "include",
    }
    fetch('/boards', headers)
      .then(response => response.json())
      .then(boards => dispatch({ type: 'ADD_BOARDS', boards: boards }));
  };
};

export function fetchPoints() {
  const headers = {
    credentials: "include",
  }
  return dispatch => {
    fetch('/points', headers)
      .then(response => response.json())
      .then(points => dispatch({ type: 'ADD_POINTS', points: points }));
  };
};

export function fetchLines() {
  return dispatch => {
    const headers = {
      credentials: "include",
    }
    fetch('/lines', headers)
      .then(response => response.json())
      .then(lines => dispatch({ type: 'ADD_LINES', lines: lines }));
  };
};

export function createGame({ accepterId, challengerId }) {
  const headers = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }, 
    credentials: "include",
    body: JSON.stringify({ accepter_id: accepterId, challenger_id: challengerId }),
  }

  return dispatch => {
    fetch('/games', headers)
      .then(response => response.json())
      .then(boards => {
        dispatch({ type: 'ADD_BOARD', board: boards.accepter_board });
        dispatch({ type: 'ADD_BOARD', board: boards.challenger_board });
      })
  }
}