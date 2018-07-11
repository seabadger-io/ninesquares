import React from 'react';

import classes from './LevelSelect.css';

const levelSelect = (props) => {
  const levels = [
    [ 'easy', 'Easy' ],
    [ 'medium', 'Medium' ],
    [ 'hard', 'Hard' ],
    [ 'veryhard', 'Very hard' ]
  ];
  return (
    <div className={classes.LevelSelect}>
      {
        levels.map(([level, name]) => {
          return <button key={level} onClick={props.onLevelSelected}>{name}</button>
        })
      }
    </div>
  );
};

export default levelSelect;
