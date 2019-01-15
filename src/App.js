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
import PopularRepos from './components/PopularRepos';
import Organization from './components/Organization';

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
        repos: [],
        popular_repos: [],
        orgs: []
      }
    }

    componentDidMount(){
      this.getProfile('anujsinghwd');
      console.log('ComponentDidMount Works');
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
            this.getLanguages(username);
            this.getContributions(username);
            this.getPopularRepos(data['public_repos'], username);
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

    getOrganizations(username){
      fetch(
        `https://api.github.com/users/${username}/orgs`,
        {
         headers: new Headers({
           'Authorization': `token ${apiToken}`,
           'Content-Type': 'application/x-www-form-urlencoded'
         })
       }
     )
      .then(res => res.json())
      .then(data => {
          this.setState({orgs: data});
      })
      .catch(err => console.log(err));
    }

    getPopularRepos(total, username){
      let popular = [];
        for(let i=1;i<=Math.ceil(total/100); i++){
            fetch(
              `https://api.github.com/users/${username}/repos?per_page=100&page=${i}`,
              {
              headers: new Headers({
                'Authorization': `token ${apiToken}`,
                'Content-Type': 'application/x-www-form-urlencoded'
              })
            }
          )
            .then(res => res.json())
            .then(data => {
                data.forEach(function (e) {
                    popular.push({id: e['id'],eye: (e['forks_count']+e['watchers_count']), watchers_count: e['watchers_count'],stargazers_count: e['stargazers_count'], forks_count: e['forks_count'],name: e['name'], url: e['html_url'], description: e['description']});
                })

                if(i === Math.ceil(total/100)){
                    popular.sort(function (a, b) {
                        return b['eye'] - a['eye']
                    });
                  this.setState({popular_repos: popular.slice(0, 5)});
                  this.getOrganizations(username);
                }
            })
            .catch(err => console.log(err));
        }
    }


    getLanguages(username){
      let languages = [];
      let finalURL = `https://api.github.com/users/${username}/repos?per_page=100`;
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
    var popular_repo;
    var organization;
    if(this.state.repos.length > 0 && this.state.language.length > 0 && this.state.user.name && this.state.popular_repos.length > 0 && this.state.orgs.length > 0)
    {
        let userData = this.state.user;
        let join = userData.created_at.split('-');
        let name = (userData.name)  ? userData.name : userData.login;
        git_profile = <Profile login={userData.login} name={name}  Website={userData.blog} location={userData.location} joined={join[0]} followers={userData.followers} public_repo={userData.public_repos}/>
        header = <Header name={name}/>
        header_new = <HeaderNew name={name}/>
        about_new = <SkillsNew Languages={this.state.language}/>
        contributions = <Contribution Repos={this.state.repos} />
        popular_repo = <PopularRepos popularRepos={this.state.popular_repos}/>
        organization = <Organization Orgs = {this.state.orgs} />
    }

    return (
      <div>
          { header_new }
          <div id="main">
              {git_profile}
              {organization}
              {about_new}
              {popular_repo}
              {contributions}
          </div>
      </div>
    );
  }
}

export default App;
