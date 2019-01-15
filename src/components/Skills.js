import React, { Component } from 'react';


class Skills extends Component {
  //const = [{'PHP':'<i class="fab fa-php"></i>'}];

  render() {
    const skillss = this.props.Languages;
    const skills = skillss.map((skill, index) => (
      <div key={index} className="p-3">
          <i className="fas fa-dot-circle"></i> {skill}
      </div>
    ));

    return (
      <div ref="myRef">
          <section>
            <div className="container">
              <h3 className="mb-1 text-info">Skills</h3>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card card-body bg-light mb-3">
                        <div className="row">
                          <div className="d-flex flex-wrap justify-content-center align-items-center">
                            {skills}
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

export default Skills;
