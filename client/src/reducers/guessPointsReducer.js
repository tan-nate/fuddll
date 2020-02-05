const guessPointsReducer = (state = [], action) => {
  switch(action.type) {
    case 'STORE_GUESS_POINT_POSITION':
      return [...state, action.point];
    default:
      return state;
  }
};
 
export default guessPointsReducer;