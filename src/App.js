import React, { Component } from 'react';
import classes from './App.css';
import Board from './components/Board/Board';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <header className={classes.Header}>
          <h1>Ninesquares</h1>
        </header>
        <main className={classes.Main}>
          <Board />
        </main>
      </div>
    );
  }
}

export default App;
