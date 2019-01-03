import React, { Component } from 'react';

class Language extends Component {


  render() {
    var lang;
    let skill = this.props.languages;
    skill = skill.map((i, j) => {
                return <li key={j}>{i}</li>
            });

    lang = <div className="item">
             <h3>&nbsp;&nbsp;</h3>
               <h4>
                 <ul>
                    {skill}
                 </ul>
               </h4>
             </div>
    return (
      <div>
        <h2>Languages</h2>
        <div className="rule"></div>
        {lang}
      </div>
    );
  }
}

export default Language;
