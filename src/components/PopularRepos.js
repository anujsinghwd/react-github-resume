import React, { Component } from 'react';

class PopularRepos extends Component {
  render(){
    const repoItems = this.props.popularRepos.map(repo => (
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
              <i className="fas fa-star"></i> Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              <i className="far fa-eye"></i> Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
             <i className="fas fa-code-branch"></i>  Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));

    return (
      <div ref="myRef">
        <section>
            <div className="container">
            <h3 className="mb-1 text-info">Popular Repositories</h3>
            {repoItems}
          </div>
        </section>
    </div>
    )
  }
}

export default PopularRepos;
