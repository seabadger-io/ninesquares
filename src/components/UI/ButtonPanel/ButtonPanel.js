import React from 'react';
import { withRouter } from 'react-router-dom';

const buttonPanel = (props) => {
  const navigate = () => {
    if (props.to) {
      props.history.push(props.to);
    }
  }

  const keyPressHandler = (event) => {
    if (typeof props.onKeyPress === 'function') {
      props.onKeyPress(event);
    }
    switch(event.key) {
      case " ": navigate(); break;
      case "Enter": navigate(); break;
      default:
    }
  }

  const clickHandler = (event) => {
    if (typeof props.onClick === 'function') {
      props.onClick(event);
    }
    navigate();
  }

  return (
    <div
      {...props.attrs}
      role="button"
      tabIndex={props.disabled ? 0 : 1}
      onClick={clickHandler}
      onKeyDown={keyPressHandler}
      aria-label={props.ariaLabel || ''}
    >
      {props.children}
    </div>
  );
};

export default withRouter(buttonPanel);
