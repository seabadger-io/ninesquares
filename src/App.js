import React, { Component } from 'react';
import classes from './App.css';
import { Route, Switch } from 'react-router-dom';
import LevelSelect from './components/LevelSelect/LevelSelect';
import PuzzleList from './components/PuzzleList/PuzzleList';
import Header from './components/Header/Header';
import Play from './components/Play/Play';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Header />
        <main className={classes.Main}>
          <Switch>
            <Route path='/' exact component={LevelSelect} />
            <Route path='/puzzles/:level/play/:idx' component={Play} />
            <Route path='/puzzles/:level' component={PuzzleList} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
