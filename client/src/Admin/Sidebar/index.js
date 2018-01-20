import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { actions as authActions } from 'lib/redux/auth'
import { actions as localeActions } from 'lib/redux/locales'
import Sidebar from './Sidebar'

export default compose(
  withRouter,

  connect(
    state => ({ localeCode: state.locale.code }),
    dispatch => ({
      signOut: () => dispatch(authActions.signOut()),
      setLocale: code => dispatch(localeActions.localeSet(code)),
    }),
  ),
)(Sidebar)
