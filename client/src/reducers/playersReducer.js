const playersReducer = (state = [], action) => {
  switch(action.type) {
    case 'LOGIN_PLAYER':
      return [...state, action.player];
    case 'REMOVE_PLAYER':
      return [];
    default:
      return state;
  }
};
 
export default playersReducer;