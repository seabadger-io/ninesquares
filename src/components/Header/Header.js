import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.css';
import AnimatedLogo from '../UI/AnimatedLogo/AnimatedLogo';

const header = () => {
  return (
    <header className={classes.Header}>
      <h1><Link to="/"><AnimatedLogo /></Link> Ninesquares</h1>
    </header>
  );
};

export default header;
