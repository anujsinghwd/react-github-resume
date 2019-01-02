import React, { Component } from 'react';
import Searchbar from './components/Searchbar';
import Resume from './components/Resume';
import Profile from './components/Profile';
import Header from './components/Header';
const API = `https://api.github.com/users`;
const apiToken = `${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: [],
      language: []
    }
    this.getLanguages = this.getLanguages.bind(this);
  }

    getProfile(username) {
        let finalURL = `${API}/${username}`;
        fetch(finalURL,{
           headers: new Headers({
             'Authorization': `token ${apiToken}`,
             'Content-Type': 'application/x-www-form-urlencoded'
           })
         })
        .then((res) => res.json())
        .then((data) => {
            this.getLanguages(data['login']);
            this.setState({user: data});
          })
         .catch((error) => console.log('There was a problem in fetching data'));
    }

    getLanguages(username){
      let languages = [];
      let finalURL = `https://api.github.com/users/${username}/repos?per_page=1000`;
      fetch(finalURL,{
        headers: new Headers({
            'Authorization': `token ${apiToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          })
        })
        .then((res) => res.json())
        .then((data) => {
            data.forEach(function(element) {
                if(element['language']){
                    languages.push(element['language']);
                }
            })
            var uniq = [ ...new Set(languages) ];
            this.setState({language: uniq});
        })
       .catch((error) => console.log('There was a problem in fetching data'));
    }

  render() {
    var git_profile;
    var header;
    var skills;

    if(this.state.user.login)
    {
        let userData = this.state.user;
        let join = userData.created_at.split('-');
        let name = (userData.name)  ? userData.name : userData.login;
        git_profile = <Profile login={userData.login} name={name}  Website={userData.blog} location={userData.location} joined={join[0]} followers={userData.followers} public_repo={userData.public_repos}/>
        header = <Header name={name}/>
    }

    if(this.state.language.length > 0){
        let skill = this.state.language;
        skill = skill.map((i, j) => {
                    return <li key={j}>{i}</li>
                });

        skills = <div className="item">
                 <h3>&nbsp;&nbsp;</h3>
                   <h4>
                     <ul>
                        {skill}
                     </ul>
                   </h4>
                 </div>
    }

    return (
      <div>
        <Searchbar searchProfile={this.getProfile.bind(this)}/>

        {header}
        <div className="container">
            {git_profile}
            <h2>Languages</h2>
            <div className="rule"></div>
            {skills}
            <h2>Involvement</h2>
            <div className="rule"></div>
            <div className="item">
              <h3>AIGA&nbsp;&nbsp;</h3>
              <h4>Chicago / West Michigan</h4>
              <h5>Member.</h5>
            </div>
            <div className="item">
              <h3>Frederik Meijer Honors College&nbsp;&nbsp;</h3>
              <h4>GVSU</h4>
              <h5>Mentor Council Member. Freshmen Mentor.</h5>
            </div>
            <div className="item">
              <h3>GV GrooVe! A Cappella&nbsp;&nbsp;</h3>
              <h4>GVSU</h4>
              <h5>Music Director.</h5>
            </div>
        </div>

        <footer>
        <div className="container">
          <h3>Get in touch?&nbsp;&nbsp;</h3>
          <h4>nickciliak@gmail.com</h4>
        </div>
        </footer>
      </div>
    );
  }
}

export default App;
