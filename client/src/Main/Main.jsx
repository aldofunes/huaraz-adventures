import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { NotFound, ScrollToTop } from 'components'
import Contact from './Contact'
import Footer from './Footer'
import Home from './Home'
import Nav from './Nav'
import Trips from './Trips'

const Main = () => (
  <div>
    <ScrollToTop />
    <Nav />

    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/contact" component={Contact} />
      <Route path="/trips" component={Trips} />

      {/* Render a not found component when no route is found */}
      <Route path="/*" component={NotFound} />
    </Switch>

    <Footer />
  </div>
)

export default Main