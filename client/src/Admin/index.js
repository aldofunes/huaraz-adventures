import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import isMobile from 'lib/isMobile'
import Admin from './Admin'

export default compose(
  connect(state => ({ jwt: state.auth.jwt })),

  isMobile(),
)(Admin)
