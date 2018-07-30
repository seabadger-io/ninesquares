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
  if (undefined === puzzles[action.puzzle.level]) {
    puzzles[action.puzzle.level] = {};
  }
  if (null !== state.savedPuzzles) {
    Object.keys(state.savedPuzzles).forEach((level) => {
      Object.keys(state.savedPuzzles[level]).forEach((idx) => {
        puzzles[level][idx] = Object.assign(state.savedPuzzles[level][idx]);
      });
    });
  }
  const savedPuzzle = null !== action.savedPuzzle ? { ...action.savedPuzzle }
    : puzzles[action.puzzle.level][action.puzzle.idx]
    ? puzzles[action.puzzle.level][action.puzzle.idx].savedPuzzle : {};
  puzzles[action.puzzle.level][action.puzzle.idx] = {
    time: action.time,
    savedPuzzle: savedPuzzle,
    completed: action.completed,
    lastUpdated: new Date().getTime()
  }
  return updateState(state, {
    savedPuzzles: puzzles
  });
}
