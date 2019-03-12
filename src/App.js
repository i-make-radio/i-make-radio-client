import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Subscriber from './Subscriber'
import Publisher from './Publisher'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <Switch>
        <Route exact path="/" component={Subscriber}/>
        <Route path="/stream" component={Publisher}/>
      </Switch>
      </Router>

    );
  }
}

export default App;
