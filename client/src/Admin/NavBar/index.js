import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions as authActions } from 'lib/redux/auth'
import { actions as localeActions } from 'lib/redux/locales'
import NavBar from './NavBar'

export default compose(
  withRouter,

  connect(
    state => ({ localeCode: state.locale.code }),
    dispatch => ({
      setLocale: code => dispatch(localeActions.setLocale(code)),
      signOut: () => dispatch(authActions.signOut()),
    }),
  ),
)(NavBar)
