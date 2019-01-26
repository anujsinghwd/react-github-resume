import React, { Component } from 'react';

class LatestRepo extends Component {
  render(){
    console.log(this.props.Repos);
    const repoItems = this.props.Repos.map(repo => (
      <div key={repo.id} className="card card-body mb-0">
        <div className="row">
          <div className="col-md-6">
            <h4>
                {repo.name}
            </h4>
            <p>{repo.description}</p>
            <a href={repo.html_url} target="_blank">{repo.html_url}</a>
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
            <h3 className="mb-1 text-info">Latest Github Repos</h3>
            {repoItems}
          </div>
        </section>
    </div>
    )
  }
}

export default LatestRepo;
