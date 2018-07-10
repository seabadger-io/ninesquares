import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../redux/actions/board';
import Tile from './Tile/Tile';
import classes from './Board.css';

class Board extends Component {
  tileRefs = {}

  resizeTiles = () => {
    let width = null;
    Object.keys(this.tileRefs).forEach((idx) => {
      if (typeof this.tileRefs[idx] !== 'undefined') {
        const ref = this.tileRefs[idx].current;
        if (width === null) {
          width = ref.clientWidth;
        }
        if (ref.clientHeight !== width) {
          ref.style.height = width + 'px';
          ref.style.fontSize = width * 0.9 + 'px';
          ref.style.lineHeight = width + 'px';
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
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeBoard !== this.props.activeBoard) {
      this.resizeTiles();
    }
  }

  render() {
    let board = null;
    if (this.props.activeBoard !== null &&
      this.props.boards[this.props.activeBoard]) {
      const boardArray = this.props.boards[this.props.activeBoard].split('');
      board = (
        <div className={classes.Board}>
          {boardArray.map((tile, idx) => {
            const newTile = <Tile
              key={idx}
              value={tile}
              getRef={ref => this.tileRefs[idx] = ref}
            />
            return newTile;
          })}
        </div>
      );
    }
    return (
      <div className={classes.GridRoot}>
        {board}
        <button onClick={this.props.testGrid}>Test grid</button>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    testGrid: () => dispatch(actions.setActiveBoard(0))
  };
};

const mapStateToProps = (state) => {
  return {
    activeBoard: state.board.activeBoard,
    boards: state.board.boards
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
