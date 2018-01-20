import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { localeSet } from 'lib/redux/locales/actions'
import Footer from './Footer'

export default compose(
  withRouter,

  connect(
    state => ({ locale: state.locale }),
    dispatch => ({
      localeSet: args => dispatch(localeSet(args)),
    }),
  ),
)(Footer)
