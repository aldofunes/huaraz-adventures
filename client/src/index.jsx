import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import client from 'lib/apollo'
import { store } from 'lib/redux'
import 'stylesheets/styles.global.scss'
import Admin from './Admin'
import Main from './Main'

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

