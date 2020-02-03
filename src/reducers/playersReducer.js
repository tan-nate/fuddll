const playersReducer = (state = [], action) => {
  switch(action.type) {
    case 'LOGIN_PLAYER':
      return [...state, action.player];
    default:
      return state;
  }
};
 
export default playersReducer;