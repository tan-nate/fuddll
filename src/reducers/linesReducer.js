const linesReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_LINE':
      return [...state, ...action.line];
    default:
      return state;
  }
};
 
export default linesReducer;