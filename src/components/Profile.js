import React, { Component } from 'react';

class Profile extends Component {
  render() {
    return (
      <div>
        <h2>Github profile</h2>
        <div className="rule"></div>
         <div className="item">
          <h4>On GitHub since {this.props.joined}, {this.props.name} is a developer
              based in {this.props.location}, with <a herf={`https://github.com/${this.props.login}?tab=repositories`}>{this.props.public_repo}</a> public repositories
              and <a href={`https://github.com/${this.props.login}?tab=followers`}>{this.props.followers} followers</a>.
          </h4>
        </div>

        <h2>Website</h2>
        <div className="rule"></div>
         <div className="item">
          <h4><a href={this.props.Website}>{this.props.Website}</a></h4>
        </div>
      </div>
    );
  }
}

export default Profile;
