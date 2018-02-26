import { graphql } from 'react-apollo'
import FileInputQuery from './FileInput.graphql'
import FileInput from './FileInput'

export default graphql(FileInputQuery, {
  props: ({ data }) => data,
})(FileInput)
