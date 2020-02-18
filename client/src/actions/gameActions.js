export function fetchPoints(boardId) {
  const headers = {
    credentials: "include",
  }
  return dispatch => {
    fetch(`/boards/${boardId}`, headers)
      .then(response => response.json())
      .then(board => dispatch({ type: 'ADD_POINTS', points: board.points }));
  };
};

export function fetchLines(boardId) {
  return dispatch => {
    const headers = {
      credentials: "include",
    }
    fetch(`/boards/${boardId}`, headers)
      .then(response => response.json())
      .then(board => dispatch({ type: 'ADD_LINES', lines: board.lines }));
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