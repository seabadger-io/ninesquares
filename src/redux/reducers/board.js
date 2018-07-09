import * as actionsDef from '../actions/actionsDef';
import { updateState } from './utils';

const initialState = {
  activeBoard: null,
  boards: null
};

export default (state = initialState, action) => {
  switch(action) {
    case actionsDef.LOAD_BOARDS:
      return updateState(state, {
        boards: action.boards
      });
    case actionsDef.SET_ACTIVE_BOARD:
      return updateState(state, {
        activeBoard: action.board
      });
    default:
      return state;
  }
}
