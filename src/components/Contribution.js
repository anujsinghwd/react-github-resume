import React, { Component } from 'react';

class Contribution extends Component {
  render() {
    var repo_contributions;
    let contributionTitles = this.props.contributionTitles;
    let contributionUrls = this.props.contributionUrls;
      repo_contributions = contributionTitles.slice(0, 5).map((i, j) => {
        return <div className="item">
                    <h4 key={j}>{i}</h4>
                    <h5 key={j+10}><a href={contributionUrls[j]}>{contributionUrls[j]}</a></h5>
              </div>;
    });

    return (
      <div>
          <h2>Recent Contributions</h2>
          <div className="rule"></div>
          {repo_contributions}
      </div>
    );
  }
}

export default Contribution;
