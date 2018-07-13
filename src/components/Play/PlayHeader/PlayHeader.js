import React from 'react';

import classes from './PlayHeader.css';
import TimeDisplay from './TimeDisplay/TimeDisplay';

const playHeader = (props) => {
  return (
    <div className={classes.PlayHeader}>
      <TimeDisplay time={props.time} />
    </div>
  );
};

export default playHeader;
