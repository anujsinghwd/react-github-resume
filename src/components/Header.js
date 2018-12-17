import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
      <header>
        <div className="container">{this.props.name}</div>
      </header>
      </div>
    );
  }
}

export default Header;
