import * as actionsDef from './actionsDef';

export const loadPuzzles = () => {
  return {
    type: actionsDef.LOAD_PUZZLES,
    puzzles: []
  }
};

export const setActivePuzzle = (id) => {
  return {
    type: actionsDef.SET_ACTIVE_PUZZLE,
    activePuzzle: id
  }
}
