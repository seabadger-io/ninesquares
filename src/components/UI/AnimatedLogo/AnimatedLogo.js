import React from 'react';
import classes from './AnimatedLogo.css';

const animatedLogo = () => {
  return (
    <span className={classes.AnimatedLogo}>
      <span className={classes.Tile} />
    </span>
  );
};

export default animatedLogo;
