export function storePointPosition(point) {
  return dispatch => dispatch({ type: 'STORE_POINT_POSITION', point: point });
};