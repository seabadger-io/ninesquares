import React, { Component } from 'react';
import classes from './App.css';
import { Route, Switch } from 'react-router-dom';
import Board from './components/Board/Board';
import LevelSelect from './components/LevelSelect/LevelSelect';
import PuzzleList from './components/PuzzleList/PuzzleList';
import Header from './components/Header/Header';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Header />
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
