import React, { Component } from 'react';

import classes from './Tile.css';

class Tile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isActiveLine: false
    }
    this.tileRef = React.createRef();
  }

  componentDidMount() {
    this.props.getRef(this);
  }

  componentWillUnmount() {
    this.props.getRef(undefined);
  }

  setActiveLine(isActive) {
    this.setState({ isActiveLine: isActive });
  }

  render(){
    const activeClasses = [classes.Tile];
    if (this.props.isFixed) {
      activeClasses.push(classes.Disabled);
    } else if (this.state.isActiveLine) {
      activeClasses.push(classes.ActiveLine);
    }
    if (this.props.preview) {
      activeClasses.push(classes.Preview);
    }
    return (
      <button
        ref={this.tileRef}
        className={activeClasses.join(' ')}
        disabled={this.props.isFixed || this.props.preview}
        onFocus={this.props.onFocus ? this.props.onFocus : () => {}}
      >
        {this.props.value}
      </button>
    );
  }
};

export default Tile;
