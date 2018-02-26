import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Footer from './Footer'

export default compose(
  withRouter,

  connect(state => ({ localeCode: state.locale.code })),
)(Footer)
