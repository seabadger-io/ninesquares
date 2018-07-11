import * as actionsDef from '../actions/actionsDef';
import { updateState } from './utils';

const initialState = {
  activePuzzle: null,
  lastActivePuzzle: null,
  puzzles: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionsDef.SET_ACTIVE_PUZZLE: return setActivePuzzle(state, action);
    case actionsDef.PUZZLES_LOADING: return { ...state, loading: true };
    case actionsDef.PUZZLES_LOADED: return puzzlesLoaded(state, action);
    case actionsDef.PUZZLES_LOAD_FAILED: return puzzlesLoadFailed(state, action);
    default:
      return state;
  }
}

const setActivePuzzle = (state, action) => {
  const updateLast = action.activePuzzle === null ? {} : { lastActivePuzzle: action.activePuzzle };
  return updateState(state, {
    activePuzzle: action.activePuzzle,
    ...updateLast
  });
}

const puzzlesLoaded = (state, action) => {
  return updateState(state, {
    puzzles: typeof action.puzzles === 'object' ? action.puzzles : null,
    error: null,
    loading: false
  });
}

const puzzlesLoadFailed = (state, action) => {
  return updateState(state, {
    error: action.error,
    loading: false
  });
}
