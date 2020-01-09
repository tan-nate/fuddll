const spacesReducer = (state = [], action) => {
  switch(action.type) {
    case 'PLACE_SHIP':
      return [...state, ...action.ship];
    default:
      return state;
  }
}
 
export default spacesReducer;