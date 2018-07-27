import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './PuzzleList.css';
import { getLevelName } from '../../common/levels';
import * as actions from '../../redux/actions';
import Spinner from '../UI/Spinner/Spinner';
import Board from '../Board/Board';

class PuzzleList extends Component {

  componentWillMount() {
    if (this.props.puzzles === null && !this.props.loading) {
      this.props.loadPuzzles();
    }
  }
  
  render() {
    const level = this.props.match.params.level;
    if (!level) {
      return <Redirect to="/" />;
    }
    let content = <Spinner />;
    if (this.props.error && this.props.puzzles === null) {
      content = (
        <div className={classes.Error}>Sorry! Could not load puzzles [{this.props.error.code}]</div>
      );
    }
    const levelName = getLevelName(level);
    if (this.props.puzzles !== null) {
      const list = this.props.puzzles[level].map((puzzle, idx) => {
        return (
          <div className={classes.Puzzle} key={idx}>
              <div className={classes.Preview}><Board puzzle={puzzle} preview /></div>
              <div className={classes.DetailsContainer}>
              <label for={'PlayButton_' + idx} className={classes.Details}>
                {levelName} puzzle #{idx}
              </label>
              <button
                className={classes.PlayButton}
                onClick={() => this.props.history.push('/puzzles/' + level + '/play/' + idx)}
                id={'PlayButton_' + idx}
              >Play</button>
              </div>
          </div>
        );
      });
      content = (
        <div className={classes.Puzzles}>
          {list}
        </div>
      );
    }
    
    return (
      <div className={classes.PuzzleList}>
        <h2>{levelName} puzzles</h2>
        {content}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    puzzles: state.puzzle.puzzles,
    loading: state.puzzle.loading,
    error: state.puzzle.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadPuzzles: (force) => dispatch(actions.loadPuzzles(force = false))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PuzzleList));
