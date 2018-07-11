import * as actionsDef from '../actions/actionsDef';
import { updateState } from './utils';

const initialState = {
  activePuzzle: null,
  lastActivePuzzle: null,
  puzzles: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionsDef.LOAD_PUZZLES:
      return updateState(state, {
        puzzles: action.puzzles
      });
    case actionsDef.SET_ACTIVE_PUZZLE:
      const updateLast = action.activePuzzle === null ? {} : { lastActivePuzzle: action.activePuzzle };
      return updateState(state, {
        activePuzzle: action.activePuzzle,
        ...updateLast
      });
    default:
      return state;
  }
}
