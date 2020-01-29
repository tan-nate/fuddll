const guessesReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_GUESS':
      return [...state, action.guess];
    case 'ADD_GUESSES':
      return [...state, ...action.guesses];
    case 'DELETE_GUESS':
      return state.filter(guess => guess.id !== action.guess.id);
    default:
      return state;
  }
};
 
export default guessesReducer;