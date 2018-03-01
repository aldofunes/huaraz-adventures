import jwtQuery from 'lib/apollo/queries/jwt.graphql'
import isMobile from 'lib/isMobile'
import { compose, graphql } from 'react-apollo'
import Admin from './Admin'

export default compose(
  graphql(jwtQuery, {
    props: ({ data }) => ({ jwt: data.auth.jwt }),
  }),

  isMobile(),
)(Admin)
