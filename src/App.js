import React, { Component } from 'react';
import Profile from './components/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import LatestRepo from './components/LatestRepo';
import Progress from "react-progress-2";
import Skills from './components/Skills';
import PopularRepos from './components/PopularRepos';
import Organization from './components/Organization';
import Issues from './components/Issues';
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
        orgs: [],
        issues: []
      }
    }

    componentDidMount(){
      this.getProfile('anujsinghwd');
    }

    getProfile(username) {
        Progress.show();
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
          this.getIssues(username);
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

    getIssues(username){
      let issue = [];
      fetch(
        `https://api.github.com/search/issues?q=type:pr+is:merged+author:${username}&per_page=10&page=1`,
        {
        headers: new Headers({
          'Authorization': `token ${apiToken}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      }
    )
      .then(res => res.json())
      .then(data => {
          data['items'].forEach(function (e) {
              issue.push({id: e['id'], title: e['title'], body: e['body'], url: e['html_url'], state: e['state']});
          })
          this.setState({issues: issue});
          Progress.hide();
      })
      .catch(err => {
          console.log(err);
          Progress.hide();
      });
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
    var latestrepos;
    var popular_repo;
    var organization;
    var issues;
    var skills;
    if(this.state.repos.length > 0 && this.state.user.name)
    {
        let userData = this.state.user;
        let join = userData.created_at.split('-');
        let name = (userData.name)  ? userData.name : userData.login;
        git_profile = <Profile login={userData.login} name={name}  Website={userData.blog} location={userData.location} joined={join[0]} followers={userData.followers} public_repo={userData.public_repos}/>
        header = <Header name={name} profileGet={this.getProfile.bind(this)} />

    }

    if(this.state.language.length > 0){
        skills = <Skills Languages={this.state.language}/>
    }

    if(this.state.repos.length > 0){
      latestrepos = <LatestRepo Repos={this.state.repos} />
    }

    if(this.state.popular_repos.length > 0){
      popular_repo = <PopularRepos popularRepos={this.state.popular_repos}/>
    }

    if(this.state.orgs.length > 0){
      organization = <Organization Orgs = {this.state.orgs} />
    }

    if(this.state.issues.length > 0){
      issues = <Issues Issues={this.state.issues}/>
    }

    return (
      <div className="layout">
          <Progress.Component style={{background: 'orange'}}
                              thumbStyle={{background: 'green'}}
          />
          { header }
          <div id="main">
              {git_profile}
              {organization}
              {skills}
              {popular_repo}
              {latestrepos}
              {issues}
          </div>
          <Footer />
      </div>
    );
  }
}

export default App;
