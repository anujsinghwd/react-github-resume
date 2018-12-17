import React, { Component } from 'react';

class Searchbar extends Component {

  submitForm(event){
    event.preventDefault();
    let value = this.refs.username.value;
    this.props.searchProfile(value);
    this.refs.username.value = '';
  }

  render() {
    return (
      <div>
      <form className="example" onSubmit={this.submitForm.bind(this)}>
          <input type="text" placeholder="Search.." ref="username" name="search" />
          <button type="submit"><i className="fa fa-search"></i></button>
      </form>
      </div>
    );
  }
}

export default Searchbar;
