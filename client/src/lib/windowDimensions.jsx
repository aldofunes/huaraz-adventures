import React, { Component } from 'react'

export default ({
  take = () => ({ width: window.innerWidth, height: window.innerHeight }),
  debounce = fn => fn,
} = {}) => WrappedComponent => class WindowDimensions extends Component {
  state = {
    width: 0,
    height: 0,
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
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  })

  render() {
    const windowProps = take(this.props)

    return (
      <WrappedComponent {...this.props} {...windowProps} />
    )
  }
}