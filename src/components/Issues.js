import React, { Component } from 'react';

class Issues extends Component {

  openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

  render() {
    console.log(this.props.Issues);
    
    const issueItems = this.props.Issues.map(issue => (
      <div key={issue.id} className="card card-body mb-0">
        <div className="row">
          <div className="col-md-10">
              <h4>
                  {issue.title}
              </h4>
              <p>{issue.body}</p>
              <a href={issue.url} target="_blank">{issue.url}</a>
          </div>
          <div className="col-md-2">
            <span className="badge badge-info mr-1">
                <i className="fab fa-github"></i> {issue.state}
            </span>
          </div>
      </div>
      </div>
    ));
    return(
      <div ref="myRef">
        <section>
            <div className="container">
              <h3 className="mb-1 text-info">Issues</h3>
              {issueItems}
            </div>
        </section>
    </div>
    );
  }
}

export default Issues;
