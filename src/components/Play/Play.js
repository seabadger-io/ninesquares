import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Play.js';
import * as actions from '../../redux/actions';
import Board from '../Board/Board';

class Play extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className={classes.Play}>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    puzzles: state.puzzle.puzzles,
    loading: state.puzzle.loading,
    error: state.puzzle.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActivePuzzle: (id) => dispatch(actions.setActivePuzzle(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Play);