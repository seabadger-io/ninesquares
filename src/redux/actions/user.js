import * as actionsDef from './actionsDef';

export const savePuzzleState = (puzzle, savedPuzzle, time, completed) => {
  return {
    type: actionsDef.SAVE_PUZZLE_STATE,
    puzzle: puzzle,
    savedPuzzle: savedPuzzle,
    time: time,
    completed: completed
  }
};
