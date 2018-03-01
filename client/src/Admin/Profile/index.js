import { graphql } from 'react-apollo'
import ProfileQuery from './Profile.graphql'
import Profile from './Profile'

export default graphql(ProfileQuery)(Profile)
