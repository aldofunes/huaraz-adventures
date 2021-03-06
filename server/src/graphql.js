import { graphqlLambda } from 'graphql-server-lambda'
import { formatError } from 'apollo-errors'
import schema from './schema'

/**
 * Lambda function that executes GraphQL queries.
 * It is behind a custom authorizer, therefore calls to this handler are already authenticated
 *
 * @param {Object} event - API Gateway provided event data
 * @param {Object} context - API Gateway provided context
 * @param callback
 */
export const handler = (event, context, callback) => {
  const { authorizer } = event.requestContext

  const handler = graphqlLambda({
    schema,
    // All the resolvers will have access to this context as the third argument
    context: { userId: authorizer && authorizer.principalId },
    formatError,
    debug: true,
  })

  handler(event, context, (error, output) => {
    if (output.headers === undefined) { output.headers = {} }
    output.headers['Access-Control-Allow-Origin'] = '*'
    callback(error, output)
  })
}
