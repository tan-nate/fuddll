const spacesReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_SPACES':
      debugger
      return [...state, ...action.points];
    case 'PLACE_SHIP':
      return [...state, ...action.ship];
    default:
      return state;
  }
}
 
export default spacesReducer;