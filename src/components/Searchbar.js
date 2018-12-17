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
        <form id="run" onSubmit={this.submitForm.bind(this)}>
          <p>
            <input id="username" type="text" ref="username" placeholder="Enter your GitHub username and click on generate" autoFocus />
            <button type="submit" id="gen">Generate</button>
          </p>
        </form>
      </div>
    );
  }
}

export default Searchbar;
