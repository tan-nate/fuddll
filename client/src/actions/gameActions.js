export function fetchBoards() {
  return dispatch => {
    fetch('/boards')
      .then(response => response.json())
      .then(boards => dispatch({ type: 'ADD_BOARDS', boards: boards }));
  };
};

export function fetchPoints() {
  return dispatch => {
    fetch('/points')
      .then(response => response.json())
      .then(points => dispatch({ type: 'ADD_POINTS', points: points }));
  };
};

export function fetchLines() {
  return dispatch => {
    fetch('/lines')
      .then(response => response.json())
      .then(lines => dispatch({ type: 'ADD_LINES', lines: lines }));
  };
};