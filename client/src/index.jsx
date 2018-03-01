import { privateClient } from 'lib/apollo'
import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'stylesheets/styles.global.scss'
import Main from './Main'

class Admin extends Component {
  state = { component: null }

  componentWillMount() {
    import('./Admin').then(component => this.setState({ component: component.default }))
  }

  render() {
    const { component: WrappedComponent } = this.state
    if (WrappedComponent) {
      return (
        <ApolloProvider client={privateClient}>
          <WrappedComponent {...this.props} />
        </ApolloProvider>
      )
    }
    return null
  }
}

render(
  (
    <BrowserRouter>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  ), document.getElementById('app'),
)

