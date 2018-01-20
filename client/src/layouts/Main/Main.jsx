import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { NotFound, ScrollToTop } from 'components'
import Contact from 'pages/Contact'
import Home from 'pages/Home'
import Trips from 'modules/Trips'
import Nav from './Nav'
import Footer from './Footer'

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