import React, { Component } from 'react';

import classes from './Tile.css';

class Tile extends Component {

  constructor(props) {
    super(props);
    this.tileRef = React.createRef();
  }

  componentDidMount() {
    this.props.getRef(this.tileRef);
  }

  componentWillUnmount() {
    this.props.getRef(undefined);
  }

  onResize = () => {
    const currentNode = this.tileRef.current;
    if (currentNode.clientHeight !== currentNode.clientWidth) {
      currentNode.style.height = currentNode.clientWidth + 'px';
      currentNode.style.fontSize = currentNode.clientWidth + 'px';
      currentNode.style.lineHeight = currentNode.clientWidth + 'px';
    }
  }

  render(){
    const activeClasses = [classes.Tile];
    if (this.props.isFixed) {
      activeClasses.push(classes.Disabled);
    } else if (this.props.isActiveLine) {
      activeClasses.push(classes.ActiveLine);
    }
    return (
      <button
        ref={this.tileRef}
        className={activeClasses}
      >
        {this.props.value}
      </button>
    );
  }
};

export default Tile;
