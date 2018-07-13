import React, { Component } from 'react';

import Tile from './Tile/Tile';
import classes from './Board.css';

class Board extends Component {
  tileRefs = {}

  resizeTiles = () => {
    let width = null;
    Object.keys(this.tileRefs).forEach((idx) => {
      if (this.tileRefs[idx] !== undefined) {
        const ref = this.tileRefs[idx].tileRef.current;
        if (width === null) {
          width = ref.clientWidth;
        }
        if (ref.clientHeight !== width) {
          ref.style.height = width + 'px';
          ref.style.fontSize = Math.floor(width * 0.9) + 'px';
          ref.style.lineHeight = width + 'px';
        }
      }
    });
  }

  onFocusLeftBoard = () => {
    Object.keys(this.tileRefs).forEach((idx) => {
      if (this.tileRefs[idx] !== undefined) {
        this.tileRefs[idx].setActiveLine(false);
      }
    })
  }

  onTileFocus = (activeIdx) => {
    Object.keys(this.tileRefs).forEach((idx) => {
      if (this.tileRefs[idx] !== undefined) {
        const ref = this.tileRefs[idx];
        if (Math.floor(idx / 9) === Math.floor(activeIdx / 9) ||
        idx % 9 === activeIdx % 9) {
          ref.setActiveLine(true);
        } else {
          ref.setActiveLine(false);
        }
      }
    });
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.resizeListener);
    this.resizeListener = null;
  }

  componentDidMount = () => {
    this.resizeListener = window.addEventListener('resize', () => {
      this.resizeTiles();
    });
    this.resizeTiles();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.puzzle !== this.props.puzzle) {
      this.resizeTiles();
    }
  }

  render() {
    let board = null;
    const activeClasses = [ classes.Board ];
    if (this.props.preview) {
      activeClasses.push(classes.Preview);
    }
    if (this.props.paused) {
      activeClasses.push(classes.Paused);
    }
    if (this.props.puzzle !== null) {
      const boardArray = this.props.puzzle.split('');
      board = (
        <div
          className={activeClasses.join(' ')}
          onBlur={this.onFocusLeftBoard}
        >
          {boardArray.map((tile, idx) => {
            const newTile = <Tile
              key={idx}
              value={tile > 0 ? tile : ' '}
              isFixed={tile !== '0'}
              getRef={ref => this.tileRefs[idx] = ref}
              onFocus={() => { this.onTileFocus(idx); }}
              preview={this.props.preview || this.props.paused}
            />
            return newTile;
          })}
        </div>
      );
    }
    return (
      <div className={classes.GridRoot}>
        {board}
        {this.props.paused ? <div className={classes.PausedBox}><span className={classes.PauseText}>▮▮</span></div> : null}
      </div>
    );
  }
};

export default Board;
