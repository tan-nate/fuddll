const pointsReducer = (state = {
  points: [],
  pointPositions: [],
}, action) => {
  switch(action.type) {
    case 'ADD_POINTS':
      return { ...state, points: action.points };
    case 'STORE_POINT_POSITION':
      return { ...state, pointPositions: [...state.pointPositions, action.point] };
    default:
      return state;
  }
};
 
export default pointsReducer;