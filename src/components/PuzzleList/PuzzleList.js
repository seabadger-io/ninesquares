import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './PuzzleList.css';
import levels from '../../common/levels';
import * as actions from '../../redux/actions';
import Spinner from '../UI/Spinner/Spinner';
import Board from '../Board/Board';
import ButtonPanel from '../UI/ButtonPanel/ButtonPanel';

class PuzzleList extends Component {

  componentWillMount() {
    if (this.props.puzzles === null && !this.props.loading) {
      this.props.loadPuzzles();
    }
  }

  navigationHandler = (event, idx) => {
    let nextIdx = idx;
    switch(event.key) {
      case "ArrowUp": nextIdx--; break;
      case "ArrowDown": nextIdx++; break;
      default:
    }
    const el = document.getElementById('puzzle' + nextIdx);
    if (el) {
      el.focus();
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
    if (this.props.puzzles !== null) {
      const list = this.props.puzzles[level].map((puzzle, idx) => {
        return (
          <ButtonPanel
            key={idx}
            attrs={{
              id: 'puzzle' + idx,
              className: classes.Puzzle
            }}
            to={'/puzzles/' + level + '/play/' + idx}
            onKeyPress={(event) => { this.navigationHandler(event, idx) }}
          >
            <div className={classes.Preview}><Board puzzle={puzzle} preview /></div>
            <div className={classes.Details}>details here later</div>
          </ButtonPanel>
        );
      });
      content = (
        <div className={classes.Puzzles}>
          {list}
        </div>
      );
    }
    const levelName = levels.filter(([lid, ]) => {
      return lid === level;
    })[0][1];
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
