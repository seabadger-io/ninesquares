import React, { Component } from 'react';
import classes from './AnimatedLogo.css';

class AnimatedLogo extends Component {
  drawCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.strokeStyle = '#2a728f';
    ctx.beginPath();
    [[10,0,10,30],[20,0,20,30],[0,10,30,10],[0,20,30,20]].forEach((cords) => {
      ctx.moveTo(cords[0], cords[1]);
      ctx.lineTo(cords[2], cords[3]);
    });
    ctx.stroke();
  }

  componentDidMount() {
    this.drawCanvas();
  }

  render() {
    return (
      <span className={classes.AnimatedLogo}>
        <canvas
          ref="canvas"
          id="animatedlogo-background"
          className={classes.Background}
          width="30" height="30"
        ></canvas>
        <span className={classes.Tile} />
      </span>
    );
  }
};

export default AnimatedLogo;
