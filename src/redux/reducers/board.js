import * as actionsDef from '../actions/actionsDef';
import { updateState } from './utils';

const initialState = {
  activeBoard: null,
  lastActiveBoard: null,
  boards: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionsDef.LOAD_BOARDS:
      return updateState(state, {
        boards: action.boards
      });
    case actionsDef.SET_ACTIVE_BOARD:
      const updateLast = action.activeBoard === null ? {} : { lastActiveBoard: action.activeBoard };
      return updateState(state, {
        activeBoard: action.activeBoard,
        ...updateLast
      });
    default:
      return state;
  }
}
