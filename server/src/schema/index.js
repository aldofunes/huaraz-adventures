import { merge } from 'lodash'
import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLDateTime } from 'lib/customScalars'
import * as Contact from './Contact'
import * as SecurityToken from './SecurityToken'
import * as Service from './Service'
import * as Tag from './Tag'
import * as Expedition from './Expedition'
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
`

const schema = makeExecutableSchema({
  typeDefs: [
    rootSchema,
    Contact.schema,
    SecurityToken.schema,
    Service.schema,
    Tag.schema,
    Expedition.schema,
    Trip.schema,
    User.schema,
  ],
  resolvers: merge(
    {
      DateTime: GraphQLDateTime,
    },
    Contact.resolvers,
    SecurityToken.resolvers,
    Service.resolvers,
    Tag.resolvers,
    Expedition.resolvers,
    Trip.resolvers,
    User.resolvers,
  ),
})

export default schema