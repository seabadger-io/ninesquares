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
    time: 0
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
    window.setInterval(this.updateTime, 1000);
  }

  updateTime = () => {
    if (!this.props.loading && this.props.puzzles !== null) {
      window.requestAnimationFrame(() => {
        this.setState({ time: new Date().getTime() / 1000 - this.startTime });
      })
    }
  }

  componentWillUnmount() {
    this.props.setActivePuzzle(null);
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
              <PlayHeader time={this.state.time} />
              <Board
                puzzle={this.props.puzzles[level][idx]}
                savedPuzzle={this.savedPuzzle}
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