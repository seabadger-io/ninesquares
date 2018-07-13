import React from 'react';

import classes from './PlayHeader.css';
import TimeDisplay from './TimeDisplay/TimeDisplay';
import PlayNavigation from './PlayNavigation/PlayNavigation';

const playHeader = (props) => {
  return (
    <div className={classes.PlayHeader}>
      <PlayNavigation activePuzzle={props.activePuzzle} />
      <TimeDisplay
        time={props.time}
        paused={props.paused}
        onTogglePause={props.onTogglePause}
      />
    </div>
  );
};

export default playHeader;
