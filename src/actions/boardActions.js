export function fetchBoards() {
  return dispatch => {
    fetch('/boards')
      .then(response => response.json())
      .then(boards => dispatch({ type: 'ADD_BOARDS', boards: boards }));
  };
};