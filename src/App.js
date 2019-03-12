import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Subscriber from './components/Subscriber'
import Publisher from './components/Publisher'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Subscriber} />
          <Route path="/stream" render={() => <Publisher />} />
        </Switch>
      </Router>
    )
  }
}

export default App
