import React, { Component } from 'react'
import debounce from 'lodash.debounce'

export default () => WrappedComponent => class IsMobile extends Component {
  constructor(props) {
    super(props)

    this.threshold = 800

    this.state = {
      isMobile: window.innerWidth < this.threshold,
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.onResize, false)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false)
  }

  onResize = debounce(() => {
    // Note that while we're not actually using this state, it will be used to
    // tell React that this component may need to render again.
    this.setState({ isMobile: window.innerWidth < this.threshold })
  })


  render() {
    const { isMobile } = this.state

    return (
      <WrappedComponent {...this.props} isMobile={isMobile} />
    )
  }
}
