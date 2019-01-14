import React, { Component } from 'react';


class Organization extends Component {

  render() {
    const orgs = this.props.Orgs;
    console.log(orgs);
    const Orgss = orgs.map((comp, index) => (
      <div key={index} className="p-3">
          <span><img src={comp.avatar_url} class="img-rounded" width="40" height="40" /> {comp.login}</span>
      </div>
    ));

    return (
      <div ref="myRef">
          <section>
            <div className="container">
              <h3 className="mb-1 text-info">Organizations</h3>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card card-body bg-light mb-3">
                        <div className="row">
                          <div className="d-flex flex-wrap justify-content-center align-items-center">
                            {Orgss}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
          </section>
      </div>
    );
  }
}

export default Organization;
