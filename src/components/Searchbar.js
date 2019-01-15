import React, { Component } from 'react';
import './searchbar.css';

class Searchbar extends Component {

  submitForm(event){
    event.preventDefault();
    let value = this.refs.username.value;
    this.props.getProfile(value);
    this.refs.username.value = '';
  }

  render() {
    return (
      <nav>
        <form onSubmit={this.submitForm.bind(this)}>
            <input type="text" placeholder="Search.." ref="username" />
            <button type="submit">Submit</button>
        </form>
      </nav>
    );
  }
}

export default Searchbar;
