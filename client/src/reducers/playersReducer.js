import { uniqueObjectIds } from '../methods';

const playersReducer = (state = {
  players: [],
  currentPlayer: null,
  opponent: null,
}, action) => {
  switch(action.type) {
    case 'ADD_PLAYERS':
      const allPlayers = uniqueObjectIds([...state.players, ...action.players]);
      const allExceptCurrent = allPlayers.filter(player => {
        return player.id !== action.currentPlayer.id
      });
      return { ...state, players: allExceptCurrent };
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
    case 'STORE_OPPONENT':
      return { ...state, opponent: action.opponent }
    default:
      return state;
  }
};
 
export default playersReducer;