const linesReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_LINE':
      return [...state, action.line];
    case 'DELETE_LINE':
      return state.filter(line => line.id !== action.line.id);
    default:
      return state;
  }
};
 
export default linesReducer;