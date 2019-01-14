import React, { Component } from 'react';

class HeaderNew extends Component {
  render(){
    return(
      <header>
          <div className="container clearfix">
              <h1 id="logo">
                  {this.props.name}
              </h1>
          </div>
      </header>
    )
  }
}

export default HeaderNew;
