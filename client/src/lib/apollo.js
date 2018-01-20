import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import fetch from 'unfetch'

let uri

switch (process.env.NODE_ENV) {
  case 'production':
    uri = 'https://7k6jhx2tk0.execute-api.us-east-1.amazonaws.com/prod/graphql'
    break

  case 'development':
    uri = 'https://yz8by994p5.execute-api.eu-west-1.amazonaws.com/dev/graphql'
    break

  default:
    uri = 'http://localhost:4000/graphql'
}

const httpLink = createHttpLink({ uri, fetch })

const authLink = setContext(() => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
}))

const errorLink = onError(({ networkError, graphQLErrors }) => {
  console.log(graphQLErrors)

  if (networkError && networkError.statusCode === 401) {
    console.log('Authentication required')
  }
})

const cache = new InMemoryCache()

const client = new ApolloClient({
  link: authLink.concat(errorLink.concat(httpLink)),
  cache,
})

export default client
