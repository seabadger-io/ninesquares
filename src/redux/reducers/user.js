import * as actionsDef from '../actions/actionsDef';
import { updateState } from './utils';

const initialState = {
  savedPuzzles: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionsDef.SAVE_PUZZLE_STATE: return savePuzzleState(state, action);
    default:
      return state;
  }
}

const savePuzzleState = (state, action) => {
  let puzzles = {};
  Object.keys(state.savedPuzzles).forEach((level) => {
    Object.keys(state.savedPuzzles[level]).forEach((idx) => {
      puzzles[level][idx] = Object.assign(state.savedPuzzles[level][idx]);
    });
  });
  puzzles[action.puzzleId.level][action.puzzleId.idx] = {
    time: action.time,
    puzzle: action.puzzle
  }
  return updateState(state, {
    savedPuzzles: puzzles
  });
}
