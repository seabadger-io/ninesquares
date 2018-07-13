import React from 'react';
import { Link } from 'react-router-dom';

import classes from './PlayNavigation.css';
import { getLevelName } from '../../../../common/levels';

const playNavigation = (props) => {
  return (
    <div className={classes.PlayNavigation}>
      <Link className={classes.Level} to={'/puzzles/' + props.activePuzzle.level}>
        {getLevelName(props.activePuzzle.level)} puzzles
      </Link>
      <span className={classes.PuzzleId}>&nbsp;#{props.activePuzzle.idx}</span>
    </div>
  );
};

export default playNavigation;
