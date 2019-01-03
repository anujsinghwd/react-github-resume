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
      language: [],
      totalContribution: 0,
      contributionTitle: [],
      contributionUrl: []
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
            this.getContributions(data['login']);
            this.setState({user: data});
          })
         .catch((error) => console.log('There was a problem in fetching data'));
    }

    getContributions(username){
      let contributionTitle = [];
      let contributionUrl = [];
      let finalURL = `https://api.github.com/search/issues?q=type:pr+is:merged+author:${username}&per_page=100`;
      fetch(finalURL,{
         headers: new Headers({
           'Authorization': `token ${apiToken}`,
           'Content-Type': 'application/x-www-form-urlencoded'
         })
       })
      .then((res) => res.json())
      .then((data) => {
          const totalContribution = data['total_count'];
            data['items'].forEach(function(element){
                contributionTitle.push(element['title']);
                contributionUrl.push(element['repository_url']);
            })
            this.setState({
                totalContribution,
                contributionTitle,
                contributionUrl
            });
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
    var contributions;
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

    if(this.state.totalContribution > 0){
      let contributionTitle = this.state.contributionTitle;
      let contributionUrl = this.state.contributionUrl;
        contributions = contributionTitle.slice(0, 5).map((i, j) => {
          return <div className="item">
                      <h4 key={j}>{i}</h4>
                      <h5 key={j+10}><a href={contributionUrl[j]}>{contributionUrl[j]}</a></h5>
                </div>;
        });
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
            <h2>Recent Contributions</h2>
            <div className="rule"></div>
            {contributions}
        </div>

        <footer>
        <div className="container">
          <h3>Get in touch?&nbsp;&nbsp;</h3>
          <h4>anuj_singh@outlook.in</h4>
        </div>
        </footer>
      </div>
    );
  }
}

export default App;
