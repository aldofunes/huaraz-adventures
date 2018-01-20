import { connect } from 'react-redux'
import Home from './Home'

export default connect(
  state => ({ locale: state.locale }),
)(Home)
