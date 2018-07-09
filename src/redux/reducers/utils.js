export const updateStateShallow = (state, update) => {
  return {...state, ...update};
};

export const updateState = (state, update) => {
  const newState = {...state};
  Object.keys(update).forEach((key) => {
    if (typeof update[key] === 'object'
        && update[key] !== null) {
      if (Array.isArray(update[key])) {
        newState[key] = [...update[key]];
      } else {
        newState[key] = {...update[key]};
      }
    } else {
      newState[key] = update[key];
    }
  });
};
