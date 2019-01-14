import React, { Component } from 'react';


class AboutNew extends Component {
  //const = [{'PHP':'<i class="fab fa-php"></i>'}];

  render() {
    const skillss = this.props.Languages;
    console.log(skillss);
    const skills = skillss.map((skill, index) => (
      <div key={index} className="p-3">
          <i class="fas fa-dot-circle"></i> {skill}
          {/*
            {(skill === 'PHP') ? <span><i className="fab fa-php" ></i> PHP</span> : null }
          {(skill === "JavaScript") ? <span><i className="fab fa-js-square"></i> JavaScript</span>: null }
          {(skill === "HTML") ? <span><i className="fab fa-html5"></i> HTML</span>: null }
          {(skill === "CSS") ? <span><i className="fab fa-css3-alt"></i> CSS</span>: null }
          {(skill === "TypeScript") ? <span><i className="fab fa-js-square"></i> TypeScript</span>: null }
          {(skill === "Dart") ? <span><i class="fas fa-chart-line"></i> Dart</span> : null }
          {(skill === "Python") ? <span><i class="fab fa-python"></i> Python</span> : null }
          {(skill === "API Blueprint") ? <span><i class="fas fa-tape"></i> API Blueprint</span> : null }
          {(skill === "Objective-C") ? <span><i class="fab fa-cuttlefish"></i> Objective-C</span> : null }
          {(skill === "Java") ? <span><i className="fab fa-java"></i> Java</span> : null }
          */}
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

export default AboutNew;
