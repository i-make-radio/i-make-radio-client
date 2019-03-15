import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Subscriber from './components/Subscriber'
import Publisher from './components/Publisher'
import SubscriberSplash from './components/SplashScreen/SubscriberSplash'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      showSplash: true
    }
    setTimeout(() => {
      this.setState({ showSplash: false })
    }, 2500)
  }
  render() {
    return (
      <Fragment>
        {this.state.showSplash ? (
          <SubscriberSplash />
        ) : (
          <Router>
            <Switch>
              <Route exact path="/" component={Subscriber} />
              <Route path="/stream" render={() => <Publisher />} />
              <Route path="/viewer" render={() => <Subscriber />} />
            </Switch>
          </Router>
        )}
      </Fragment>
    )
  }
}

export default App
