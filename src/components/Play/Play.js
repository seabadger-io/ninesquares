import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Play.js';
import * as actions from '../../redux/actions';
import Spinner from '../UI/Spinner/Spinner';
import Board from '../Board/Board';

class Play extends Component {
  componentDidMount() {
    if (this.props.puzzles === null &&
    !this.props.loading) {
      this.props.loadPuzzles();
    }
    const params = this.props.match.params;
    this.props.setActivePuzzle({ level: params.level, idx: params.idx });
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
          content = <Board puzzle={this.props.puzzles[level][idx]} />;
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
    error: state.puzzle.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActivePuzzle: (id) => dispatch(actions.setActivePuzzle(id)),
    loadPuzzles: () => dispatch(actions.loadPuzzles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play);