import { NotFound, ScrollToTop } from 'components'
import { publicClient } from 'lib/apollo'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Route, Switch } from 'react-router-dom'
import Contact from './Contact'
import Expeditions from './Expeditions'
import Footer from './Footer'
import Home from './Home'
import styles from './Main.scss'
import Nav from './Nav'

const Main = () => (
  <ApolloProvider client={publicClient}>
    <div className={styles.container}>
      <ScrollToTop />
      <Nav />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/contact" component={Contact} />
        <Route path="/expeditions" component={Expeditions} />

        {/* Render a not found component when no route is found */}
        <Route path="/*" component={NotFound} />
      </Switch>

      <Footer />
    </div>
  </ApolloProvider>
)

export default Main
