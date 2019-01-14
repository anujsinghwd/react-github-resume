import React, { Component } from 'react';
import Searchbar from './components/Searchbar';
import Profile from './components/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import Language from './components/Language';
import Contribution from './components/Contribution';
import Progress from "react-progress-2";
import Test from './components/Test';
import HeaderNew from './components/HeaderNew';
import SkillsNew from './components/SkillsNew';

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
        contributionUrl: [],
        repos: []
      }
    }

    componentDidMount(){
      this.getProfile('anujsinghwd');
    }

    getProfile(username) {
        //Progress.show();
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
          fetch(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created: asc`,
            {
             headers: new Headers({
               'Authorization': `token ${apiToken}`,
               'Content-Type': 'application/x-www-form-urlencoded'
             })
           }
         )
          .then(res => res.json())
          .then(data => {

              this.setState({ repos: data });

          })
          .catch(err => console.log(err));
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
            var uniq = [...new Set(languages)];
            this.setState({language: uniq});
        })
       .catch((error) => console.log('There was a problem in fetching data'));
    }

  render() {
    var git_profile;
    var header;
    var about_new;
    var contributions;
    var header_new;
    if(this.state.user.login)
    {
        let userData = this.state.user;
        let join = userData.created_at.split('-');
        let name = (userData.name)  ? userData.name : userData.login;
        git_profile = <Profile login={userData.login} name={name}  Website={userData.blog} location={userData.location} joined={join[0]} followers={userData.followers} public_repo={userData.public_repos}/>
        header = <Header name={name}/>
        header_new = <HeaderNew name={name}/>;
        about_new = <SkillsNew Languages={this.state.language}/>;
        contributions = <Contribution Repos={this.state.repos} />

    }

    return (
      <div>
          { header_new }
          <div id="main">
              {git_profile}
              {about_new}
              {contributions}
          </div>
      </div>
    );
  }
}

export default App;
