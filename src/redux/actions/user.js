import * as actionsDef from './actionsDef';

export const savePuzzleState = (puzzleId, time, puzzle ) => {
  return {
    type: actionsDef.SAVE_PUZZLE_STATE,
    puzzleId: puzzleId,
    time: time,
    puzzle: puzzle
  }
};
