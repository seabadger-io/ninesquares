import React from 'react';
import { withRouter } from 'react-router-dom';

import levels from '../../common/levels';
import classes from './LevelSelect.css';

const levelSelect = (props) => {
  const onLevelSelected = (level) => {
    props.history.push('/puzzles/' + level);
  }

  return (
    <div className={classes.LevelSelect}>
      {
        levels.map(([level, name]) => {
          return <button key={level} onClick={() => onLevelSelected(level)}>{name}</button>
        })
      }
    </div>
  );
};

export default withRouter(levelSelect);
