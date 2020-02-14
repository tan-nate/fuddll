import { uniqueObjectIds } from '../methods';

const playersReducer = (state = {
  players: [],
  currentPlayer: null,
}, action) => {
  switch(action.type) {
    case 'ADD_PLAYERS':
      return { ...state, players: uniqueObjectIds([...state.players, ...action.players]) };
    case 'ADD_PLAYER':
      return { ...state, players: uniqueObjectIds([...state.players, action.player]) };
    case 'LOGIN_PLAYER':
      return { ...state, currentPlayer: action.player }
    case 'REMOVE_PLAYER':
      return { ...state, players: state.players.filter(player => player.id !== action.player.id) };
    case 'CLEAR_PLAYERS':
      return { ...state, players: [] }
    case 'LOGOUT_PLAYER':
      return { ...state, currentPlayer: null }
    default:
      return state;
  }
};
 
export default playersReducer;