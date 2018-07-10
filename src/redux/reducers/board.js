import * as actionsDef from '../actions/actionsDef';
import { updateState } from './utils';

const initialState = {
  activeBoard: null,
  boards: null
};

let board = '';
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    if (Math.random() > 0.8) {
      board += Math.floor(Math.random() * 10);
    } else {
      board += 0;
    }
  }
}
initialState.boards = [ board ];

export default (state = initialState, action) => {
  switch(action.type) {
    case actionsDef.LOAD_BOARDS:
      return updateState(state, {
        boards: action.boards
      });
    case actionsDef.SET_ACTIVE_BOARD:
      return updateState(state, {
        activeBoard: action.activeBoard
      });
    default:
      return state;
  }
}