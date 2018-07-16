import React from 'react';

import Icon from '../../../UI/Icon/Icon';
import classes from './TimeDisplay.css';

const timeDisplay = (props) => {
  let minutes = Math.floor(props.time / 60);
  let seconds = Math.floor(props.time % 60);
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;
  return (
    <div className={classes.TimeDisplay}>
      <span className={classes.Time}>{minutes}:{seconds}</span>
      <button
        className={classes.PlayPause}
        onClick={props.onTogglePause ? props.onTogglePause : () => {}}
      >
      {props.paused ? <Icon icon="play" label="Continue playing"/>
      : <Icon icon="pause" label="Pause game" />}
      </button>
    </div>
  );
};

export default timeDisplay;
