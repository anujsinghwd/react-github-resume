import React, { Component } from 'react';
const apiToken = `${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`;

class LatestRepos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clientId: '26c196bacea7db10cf48',
      clientSecret: '0885cb690e07d2a93a6afb0891fb552fd9f7aa53',
      count: 5,
      sort: 'created: asc',
      repos: []
    };
  }

  componentDidMount() {
    const username  = 'anujsinghwd';
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }

  render(){

    const repoItems = this.state.repos.map(repo => (
      <div key={repo.id} className="card card-body mb-0">
        <div className="row">
          <div className="col-md-6">
            <h4>

                {repo.name}

            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));

    return (
      <div ref="myRef">
        <section>
            <div className="container">
            <h3 className="mb-1 text-info">Latest Github Repos</h3>
            {repoItems}
          </div>
        </section>
    </div>
    )
  }
}

export default LatestRepos;
