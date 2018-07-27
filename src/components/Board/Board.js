import React, { Component } from 'react';

import Icon from '../UI/Icon/Icon';
import Tile from './Tile/Tile';
import Numpad from './Numpad/Numpad';
import classes from './Board.css';

class Board extends Component {
  tileRefs = {}

  state = {
    tileSelected: null,
    tileFocused: null,
    setTiles: {},
    invalidTiles: {}
  }

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
    this.setState({ tileFocused: activeIdx });
  }

  tileClicked = (idx) => {
    this.setState({ tileSelected: idx });
  }

  numpadCloseHandler = (idx, key) => {
    const update = { tileSelected: null };
    if (key) {
      const setTiles = {...this.state.setTiles};
      if (key !== 'reset') {
        setTiles[idx] = key.toString();
      } else {
        delete setTiles[idx];
      }
      update.setTiles = setTiles;
    }
    const validation = this.props.onUpdate(update.setTiles || this.state.setTiles);
    update.invalidTiles = {...validation.invalidTiles};
    this.setState(update);
    this.tileRefs[idx].tileRef.current.focus();
  }

  keyDownHandler = (event) => {
    let currentButton = 40;
    if (this.state.tileFocused !== null) {
      currentButton = this.state.tileFocused;
    }
    switch(event.key) {
      case 'ArrowLeft':
        while (currentButton > 1 && this.tileRefs[currentButton - 1].tileRef.current.disabled) {
          currentButton = currentButton - 1;
        }
        if (currentButton > 1) {
          this.tileRefs[currentButton - 1].tileRef.current.focus();
        }
        event.preventDefault();
        break;
      case 'ArrowRight':
        while (currentButton < 80 && this.tileRefs[currentButton + 1].tileRef.current.disabled) {
          currentButton = currentButton + 1;
        }
        if (currentButton < 80) {
          this.tileRefs[currentButton + 1].tileRef.current.focus();
        }
        event.preventDefault();
        break;
      case 'ArrowUp':
        while (currentButton > 8 && this.tileRefs[currentButton - 9].tileRef.current.disabled) {
          currentButton = currentButton - 9;
        }
        if (currentButton > 8) {
          this.tileRefs[currentButton - 9].tileRef.current.focus();
        }
        event.preventDefault();
        break;
      case 'ArrowDown':
        while (currentButton < 71 && this.tileRefs[currentButton + 9].tileRef.current.disabled) {
          currentButton = currentButton + 9;
        }
        if (currentButton < 71) {
          this.tileRefs[currentButton + 9].tileRef.current.focus();
        }
        event.preventDefault();
        break;
      default:
    }
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
    if (!this.props.preview) {
      let focused = 0;
      while (this.tileRefs[focused].tileRef.current.disabled) {
        focused++;
      }
      this.tileRefs[focused].tileRef.current.focus();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.puzzle !== this.props.puzzle) {
      this.resizeTiles();
    }
    if (!prevProps.paused && this.props.paused) {
      this.setState({ tileSelected: null });
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
    if (this.props.completed) {
      activeClasses.push(classes.Completed);
    }
    if (this.props.puzzle !== null) {
      const boardArray = this.props.puzzle.split('');
      const tiles = boardArray.map((tile, idx) => {
        const value = this.state.setTiles[idx] ?
        this.state.setTiles[idx] : tile > 0 ? tile : ' ';
        const newTile = <Tile
          key={idx}
          value={value}
          isFixed={tile !== '0'}
          getRef={ref => this.tileRefs[idx] = ref}
          onFocus={() => { this.onTileFocus(idx); }}
          preview={this.props.preview}
          paused={this.props.paused}
          stopped={this.props.completed}
          onClick={() => {this.tileClicked(idx)}}
          isInvalid={this.state.invalidTiles[idx] || false}
        />
        return newTile;
      });
      const lines = [];
      for (let i=0; i < 9; i++) {
        lines.push((
          <div className={classes.Line} key={'line_' + i}>
            {tiles.slice(i * 9, (i * 9) + 9)}
          </div>
        ));
      }
      board = (
        <div
          className={activeClasses.join(' ')}
          onBlur={this.onFocusLeftBoard}
          onKeyDown={this.keyDownHandler}
        >
          {lines}
        </div>
      );
    }
    return (
      <div className={classes.GridRoot}>
        {board}
        {this.props.paused ? <div className={classes.PausedBox}><span className={classes.PauseText}><Icon icon="pause" /></span></div> : null}
        {this.state.tileSelected !== null
          ? <Numpad
              onClose={(key) => this.numpadCloseHandler(this.state.tileSelected, key)}
              current={this.state.setTiles[this.state.tileSelected] || null} />
          : null}
      </div>
    );
  }
};

export default Board;
