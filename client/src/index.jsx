import React from 'react'
import ReactDOM from 'react-dom'
import 'stylesheets/styles.global.scss'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import client from 'lib/apollo'
import { store } from 'lib/redux'
import Admin from 'layouts/Admin'
import Main from 'layouts/Main'

ReactDOM.render((
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
), document.getElementById('app'))

