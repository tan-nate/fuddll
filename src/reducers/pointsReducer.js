const pointsReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_POINTS':
      return [...state, ...action.points];
    default:
      return state;
  }
};
 
export default pointsReducer;