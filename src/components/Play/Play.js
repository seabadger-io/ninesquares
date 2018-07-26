import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Play.js';
import * as actions from '../../redux/actions';
import Spinner from '../UI/Spinner/Spinner';
import Board from '../Board/Board';
import Aux from '../HOC/Aux/Aux';
import PlayHeader from './PlayHeader/PlayHeader';

class Play extends Component {
  state = {
    savedTime: 0,
    time: 0,
    paused: true
  }

  componentDidMount() {
    if (this.props.puzzles === null &&
    !this.props.loading) {
      this.props.loadPuzzles();
    }
    const params = this.props.match.params;
    this.props.setActivePuzzle({ level: params.level, idx: params.idx });
    this.startTime = new Date().getTime() / 1000;
    this.savedPuzzle = null;
    if (typeof this.props.savedPuzzles === 'object' &&
    this.props.savedPuzzles !== null &&
    params.level in this.props.savedPuzzles &&
    params.idx in this.props.savedPuzzles[params.level]) {
      const savedState = this.props.savedPuzzles[params.level][params.idx];
      this.savedPuzzle = savedState.puzzle;
      this.setState({ time: savedState.time });
    }
    this.setState({ paused: false });
    this.timer = window.setInterval(this.updateTime, 1000);
  }

  updateTime = () => {
    if (!this.props.loading && this.props.puzzles !== null &&
    !this.state.paused) {
      window.requestAnimationFrame(() => {
        this.setState({ time: new Date().getTime() / 1000 - this.startTime });
      })
    }
  }

  checkBoard = (savedState) => {
    const {level, idx} = {...this.props.activePuzzle};
    const board = this.props.puzzles[level][idx].split('');
    const completeBoard = board.map((value, idx) => {
      if (savedState[idx]) {
        return savedState[idx];
      } else {
        return value;
      }
    });
    const response = {
      valid: true,
      complete: true,
      invalidTiles: {}
    };
    const setInvalid = (idx, opponent) => {
      response.invalidTiles[idx] = true;
      response.invalidTiles[opponent] = true;
      response.valid = false;
    };
    Object.keys(savedState).map(k => parseInt(k, 0)).forEach((idx) => {
      const value = savedState[idx];
      if (value === 0) {
        response.complete = false;
      }
      if (!response.invalidTiles[idx] && value !== '0') {
        const xBase = Math.floor(idx % 9);
        const yBase = Math.floor(idx / 9);
        for (let i = 0; i < 9; i++) {
          const xC = xBase + (9 * i);
          if (idx !== xC && completeBoard[xC] === value) {
            setInvalid(idx, xC);
          }
          const yC = yBase * 9 + i;
          if (idx !== yC && completeBoard[yC] === value) {
            setInvalid(idx, yC);
          }
        }
        const boxX = Math.floor(xBase / 3) * 3;
        const boxY = Math.floor(yBase / 3) * 3;
        for (let y = 0; y < 3; y++) {
          for (let x = 0; x < 3; x++) {
            const bC = boxX + x + (boxY + y) * 9;
            if (idx !== bC && completeBoard[bC] === value) {
              setInvalid(idx, bC);
            }
          }
        }
      }
    });
    return response;
  }

  onTogglePause = () => {
    this.setState({ paused: !this.state.paused }, () => {
      if (this.state.paused) {
        const time = this.state.time;
        const savedTime = this.state.savedTime;
        this.setState({
          time: 0,
          savedTime: savedTime + time
        })
      } else {
        this.startTime = new Date().getTime() / 1000;
      }
    });
  }

  componentWillUnmount() {
    this.props.setActivePuzzle(null);
    window.clearInterval(this.timer);
  }

  render() {
    let content = <Spinner />;
    if (this.props.activePuzzle !== null) {
      if (this.props.puzzles !== null) {
        const {level, idx} = {...this.props.activePuzzle};
        if (level in this.props.puzzles &&
        this.props.puzzles[level][idx]) {
          content = (
            <Aux>
              <PlayHeader
                time={this.state.time + this.state.savedTime}
                paused={this.state.paused}
                onTogglePause={this.onTogglePause}
                activePuzzle={this.props.activePuzzle}
              />
              <Board
                puzzle={this.props.puzzles[level][idx]}
                savedPuzzle={this.savedPuzzle}
                paused={this.state.paused}
                onUpdate={this.checkBoard}
              />
            </Aux>
          );
        } else if (!this.props.loading) {
          content = (
            <div className={classes.Error}>
              Sorry! Puzzle not found.
            </div>
          );
        }
      } else if (!this.props.loading && this.props.error) {
        content = (
          <div className={classes.Error}>
            Sorry! Failed to load puzzles [{this.props.error.code}]
          </div>
        );
      }
    }
    return (
      <div className={classes.Play}>
        {content}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activePuzzle: state.puzzle.activePuzzle,
    puzzles: state.puzzle.puzzles,
    loading: state.puzzle.loading,
    error: state.puzzle.error,
    savedPuzzles: state.user.savedPuzzles
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActivePuzzle: (id) => dispatch(actions.setActivePuzzle(id)),
    loadPuzzles: () => dispatch(actions.loadPuzzles()),
    savePuzzleState: (puzzleId, time, puzzle) => dispatch(actions.savePuzzleState(puzzleId, time, puzzle))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play);