const boardsReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_BOARDS':
      return [...state, ...action.boards];
    case 'ADD_BOARD':
      return [...state, action.board];
    default:
      return state;
  }
};
 
export default boardsReducer;