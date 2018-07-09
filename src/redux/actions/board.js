import * as actionsDef from './actionsDef';

export const loadBoards = () => {
  return {
    type: actionsDef.LOAD_BOARDS,
    boards: []
  }
};

export const setActiveBoard = (id) => {
  return {
    type: actionsDef.SET_ACTIVE_BOARD,
    activeBoard: id
  }
}
