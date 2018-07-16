import React from 'react';

import fontAwesome from 'font-awesome/css/font-awesome.css';
import classes from './Icon.css';
import Aux from '../../HOC/Aux/Aux';

export default (props) => {
  const fa = fontAwesome['fa'];
  const icon = fontAwesome['fa-' + props.icon];
  const iconClasses = Array.isArray(props.classes) ? props.classes : [];

  return (
    <Aux>
      <i className={[fa, icon, ...iconClasses].join(' ')} aria-hidden></i>
      {props.label ? <span class={classes.srOnly}>{props.label}:</span> : null}
    </Aux>
  );
}
