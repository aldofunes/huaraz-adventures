import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setLocale } from 'lib/redux/locales/actions'
import Nav from './Nav'

export default compose(
  withRouter,

  connect(
    state => ({ locale: state.locale }),
    dispatch => ({
      localeSet: args => dispatch(setLocale(args)),
    }),
  ),
)(Nav)
