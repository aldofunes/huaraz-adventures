import React, { Component, createElement } from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import client from 'lib/apollo'
import { store } from 'lib/redux'
import 'stylesheets/styles.global.scss'
import Main from './Main'

class Admin extends Component {
  state = { component: null }

  componentWillMount() {
    import('./Admin').then(component => this.setState({ component: component.default }))
  }

  render() {
    const { component } = this.state
    if (component) { return createElement(component, this.props) }
    return null
  }
}

render(
  (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/" component={Main} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  ), document.getElementById('app'),
)

