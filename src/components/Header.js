import React, { Component } from 'react';
import Searchbar from './Searchbar';

class HeaderNew extends Component {

  getProfiles(username){
    this.props.profileGet(username);
  }

  render(){
    return(
      <header>
          <div className="container clearfix">
              <h1 id="logo">
                  {this.props.name}
              </h1>
              <Searchbar getProfile={this.getProfiles.bind(this)}/>
          </div>
      </header>
    )
  }
}

export default HeaderNew;
