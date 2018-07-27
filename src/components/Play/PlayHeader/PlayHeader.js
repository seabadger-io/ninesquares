import React from 'react';
import { Link } from 'react-router-dom';
import { getLevelName } from '../../../common/levels';
import Icon from '../../UI/Icon/Icon';
import classes from './PlayHeader.css';

const playHeader = (props) => {
  let minutes = Math.floor(props.time / 60);
  let seconds = Math.floor(props.time % 60);
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;
  let button = props.completed ? null : (
    <button
      className={classes.PlayPause}
      onClick={props.onTogglePause ? props.onTogglePause : () => {}}
    >
      {props.paused ? <Icon icon="play" label="Continue playing" />
      : <Icon icon="pause" label="Pause game" />}
    </button>
  );
  return (
    <div className={classes.PlayHeader}>
      <div className={classes.Level}>
        <Link to={'/puzzles/' + props.activePuzzle.level}>
          {getLevelName(props.activePuzzle.level)} puzzles
        </Link>
        <span className={classes.PuzzleId}>&nbsp;#{props.activePuzzle.idx}</span>
      </div>
      <div className={classes.TimeDisplay}>
        <span className={classes.Time}>{minutes}:{seconds}</span>
        {button}
      </div>
    </div>
  );
};

export default playHeader;
