import { merge } from 'lodash'
import casual from 'casual'
import { addMockFunctionsToSchema, makeExecutableSchema, MockList } from 'graphql-tools'
import GraphQLJSON from 'graphql-type-json'
import {
  GraphQLEmail,
  GraphQLLimitedString,
  GraphQLPassword,
  GraphQLURL,
  GraphQLUUID,
} from 'graphql-custom-types'
import { GraphQLDateTime } from 'lib/customScalars'
import * as Contact from './Contact'
import * as SecurityToken from './SecurityToken'
import * as Service from './Service'
import * as Tag from './Tag'
import * as Tour from './Tour'
import * as Trip from './Trip'
import * as User from './User'

const rootSchema = `
  type RootQuery {
    test: String @deprecated
  }
  
  type RootMutation {
    test: String @deprecated
  }
  
  schema {
    # This schema allows the following queries
    query: RootQuery
    
    # This schema allows the following mutations
    mutation: RootMutation
  }
  
  scalar DateTime
  scalar Email
  scalar JSON
  scalar LimitedString
  scalar Password
  scalar URL
  scalar UUID
`

const schema = makeExecutableSchema({
  typeDefs: [
    rootSchema,
    Contact.schema,
    SecurityToken.schema,
    Service.schema,
    Tag.schema,
    Tour.schema,
    Trip.schema,
    User.schema,
  ],
  resolvers: merge(
    {
      DateTime: GraphQLDateTime,
      Email: GraphQLEmail,
      JSON: GraphQLJSON,
      LimitedString: GraphQLLimitedString,
      Password: GraphQLPassword,
      URL: GraphQLURL,
      UUID: GraphQLUUID,
    },
    Contact.resolvers,
    SecurityToken.resolvers,
    Service.resolvers,
    Tag.resolvers,
    Tour.resolvers,
    Trip.resolvers,
    User.resolvers,
  ),
})

// addMockFunctionsToSchema({
//   schema,
//   mocks: {
//     Int: () => casual.integer(),
//     Float: () => casual.double(),
//     String: () => casual.string,
//     DateTime: () => casual.unix_time,
//     URL: () => 'https://placeholdit.co//i/720x360?bg=999999',
//
//     RootQuery: () => ({
//       trips: () => new MockList(5),
//     }),
//     Trip: () => ({
//       tours: () => new MockList([3, 9]),
//     }),
//   },
// })

export default schema