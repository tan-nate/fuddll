export function storePointPosition(point) {
  return dispatch => dispatch({ type: 'STORE_POINT_POSITION', point: point });
};

export function sendPoints({ points, board }) {
  let formData = {
    line: {
      point1_id: points[0].id,
      point2_id: points[1].id,
      board_id: board
    }
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }, 
    body: JSON.stringify(formData)
  };

  return dispatch => {
    fetch('/lines', configObj)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Connected points must be adjacent");
        }
      })
      .then(line => dispatch({ type: 'ADD_LINE', line: line }))
      .catch(error => {
        console.log(error);
      });
  };
};

export function deleteLine(line) {
  let configObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };
  
  return dispatch => {
    fetch(`/lines/${line.id}`, configObj)
      .then(response => response.json())
      .then(line => dispatch({ type: 'DELETE_LINE', line: line }));
  };
}