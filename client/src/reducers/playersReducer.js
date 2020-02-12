import { uniqueObjectIds } from '../methods';

const playersReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_PLAYERS':
      var newState = [...state, ...action.players];
      return uniqueObjectIds(newState);
    case 'LOGIN_PLAYER':
      newState = [...state, action.player];
      return uniqueObjectIds(newState);
    case 'REMOVE_PLAYER':
      return state.filter(player => player.id !== action.player.id);
    default:
      return state;
  }
};
 
export default playersReducer;