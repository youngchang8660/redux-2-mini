import React, { Component } from 'react';
import SideBar from './components/shared/SideBar/SideBar';
import HackerNews from './components/HackerNews/HackerNews'
import Reddit from './components/Reddit/Reddit'
import Medium from './components/Medium/Medium'
import { HashRouter, Switch, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className='App'>
          <SideBar />
          <Switch>
            <Route path='/hacker-news' component={HackerNews} />
            <Route path='/medium' component={Medium} />
            <Route path='/reddit' component={Reddit} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
