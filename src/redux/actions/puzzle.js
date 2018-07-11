import * as actionsDef from './actionsDef';
import firebaseDB from '../../common/firebaseDB';

export const loadPuzzles = (forceReload = false) => {
  return (dispatch, getState) => {
    dispatch(puzzlesLoading());
    const state = getState();
    if (state.puzzle.puzzles !== null && !forceReload) {
      dispatch(puzzlesLoaded(state.puzzle.puzzles));
    } else {
      firebaseDB.ref('/puzzles').once('value').then((snapshot) => {
        dispatch(puzzlesLoaded(snapshot.val()));
      })
      .catch((error) => {
        dispatch(puzzlesLoadFailed(error));
      });
    }
  };
}

export const setActivePuzzle = (id) => {
  return {
    type: actionsDef.SET_ACTIVE_PUZZLE,
    activePuzzle: id
  }
}

export const puzzlesLoading = () => {
  return {
    type: actionsDef.PUZZLES_LOADING
  }
}

export const puzzlesLoaded = (puzzles) => {
  return {
    type: actionsDef.PUZZLES_LOADED,
    puzzles: puzzles
  }
}

export const puzzlesLoadFailed = (error) => {
  return {
    type: actionsDef.PUZZLES_LOAD_FAILED,
    error: error
  }
}
