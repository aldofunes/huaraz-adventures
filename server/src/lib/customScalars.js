import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

export const GraphQLDateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Date custom scalar type',
  parseValue: value => new Date(value).getTime(),
  serialize: value => value,
  parseLiteral: ast => {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10) // ast value is always in string format
    }
    return null
  },
})
