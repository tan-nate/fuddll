const spacesReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_SPACES':
      return [...state, ...action.spaces];
    case 'PLACE_SHIP':
      return [...state, ...action.ship];
    default:
      return state;
  }
}
 
export default spacesReducer;