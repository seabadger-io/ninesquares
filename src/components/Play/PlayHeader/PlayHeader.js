import React from 'react';

import classes from './PlayHeader.css';
import TimeDisplay from './TimeDisplay/TimeDisplay';

const playHeader = (props) => {
  return (
    <div className={classes.PlayHeader}>
      <TimeDisplay
        time={props.time}
        paused={props.paused}
        onTogglePause={props.onTogglePause}
      />
    </div>
  );
};

export default playHeader;
