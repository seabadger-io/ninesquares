import React, { Component } from 'react';
import classes from './App.css';
import { Route, Switch } from 'react-router-dom';
import Board from './components/Board/Board';
import LevelSelect from './components/LevelSelect/LevelSelect';
import PuzzleList from './components/PuzzleList/PuzzleList';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <header className={classes.Header}>
          <h1>Ninesquares</h1>
        </header>
        <main className={classes.Main}>
          <Switch>
            <Route path='/' exact component={LevelSelect} />
            <Route path='/puzzles/:level' component={PuzzleList} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
