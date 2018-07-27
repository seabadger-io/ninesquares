import React, { Component } from 'react';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './Numpad.css';

class Numpad extends Component {

  constructor() {
    super();
    this.buttonRefs = {};
    this.currentButton = null;
    this.buttons = [...[...Array(9).keys()].map(n => n + 1)].map((n) => {
      return (
        <button
          key={n}
          className={classes.Button}
          onClick={() => { this.buttonClickHandler(n); }}
          onFocus={() => { this.currentButton = n }}
          ref={(btn) => {this.buttonRefs[n] = btn}}
        >{n}</button>
      );
    });
  }

  componentDidMount() {
    const c = this.props.current ? this.props.current : 'reset';
    this.buttonRefs[c].focus();
  }

  buttonClickHandler = (key) => {
    this.props.onClose(key);
  };

  keyDownHandler = (event) => {
    if (event.key.match(/[1-9]/)) {
      this.props.onClose(event.key);
    } else {
      const currentButton = this.currentButton === 'reset' ? 10 : this.currentButton;
      switch(event.key) {
        case 'ArrowLeft':
          if (currentButton > 1) {
            this.buttonRefs[currentButton - 1].focus();
          }
          break;
        case 'ArrowRight':
          if (currentButton < 9) {
            this.buttonRefs[currentButton + 1].focus();
          } else {
            this.buttonRefs['reset'].focus();
          }
          break;
        case 'ArrowUp':
          if (currentButton > 3) {
            this.buttonRefs[currentButton - 3].focus();
          }
          break;
        case 'ArrowDown':
          if (currentButton < 7) {
            this.buttonRefs[currentButton + 3].focus();
          } else {
            this.buttonRefs['reset'].focus();
          }
          break;
        case 'Enter':
        case ' ':
          this.props.onClose(this.currentButton);
          break;
        case 'Escape':
          this.props.onClose();
          break;
        default:
      }
    }
    event.preventDefault();
  }

  render() {
    return (
      <div
        className={classes.Numpad}
        onKeyDown={this.keyDownHandler}
      >
        {this.buttons}
        <button
          className={classes.CtrlButton}
          onClick={() => { this.props.onClose('reset'); }}
          onFocus={() => { this.currentButton = 'reset' }}
          ref={(btn) => {this.buttonRefs['reset'] = btn}}
        >Reset</button>
        <Backdrop onClick={() => this.props.onClose()} />
      </div>
    );
  }
};

export default Numpad;
