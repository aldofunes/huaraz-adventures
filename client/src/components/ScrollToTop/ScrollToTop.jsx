import { Component } from 'react'
import PropTypes from 'prop-types'

class ScrollToTop extends Component {
  componentDidUpdate({ location }) {
    if (this.props.location !== location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return null
  }
}

ScrollToTop.propTypes = {
  location: PropTypes.any,
}

export default ScrollToTop
