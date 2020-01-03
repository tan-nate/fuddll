const boardsReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_BOARDS':
      return [...state, ...action.boards];
    default:
      return state;
  }
}
 
export default boardsReducer;