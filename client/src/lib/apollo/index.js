import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { createHttpLink } from 'apollo-link-http'
import { RetryLink } from 'apollo-link-retry'
import jwtQuery from 'lib/apollo/queries/jwt.graphql'
import { withClientState } from 'apollo-link-state'
import localForage from 'localforage'
import { merge } from 'lodash-es'
import fetch from 'unfetch'
import auth from './state/auth'
import locale from './state/locale'

const cache = new InMemoryCache()

persistCache({
  cache,
  storage: localForage,
})

const authLink = setContext((arg1, context) => {
  const { jwt } = context.cache.readQuery({ query: jwtQuery }).auth

  return {
    headers: { Authorization: `Bearer ${jwt}` },
  }
})

const errorLink = onError(({ operation, networkError, graphQLErrors }) => {
  console.log(operation)

  if (networkError && networkError.statusCode === 401) {
    console.log('Please authenticate first')
  }
})

const privateHttpLink = createHttpLink({ uri: `${process.env.BACKEND_URL}/private`, fetch })

const publicHttpLink = createHttpLink({ uri: `${process.env.BACKEND_URL}/public`, fetch })

const retryLink = new RetryLink({ attempts: { max: 10 } })

const stateLink = withClientState({
  cache,
  resolvers: merge(
    auth.resolvers,
    locale.resolvers,
  ),
  defaults: merge(
    auth.defaults,
    locale.defaults,
  ),
})

export const privateLink = ApolloLink.from([
  retryLink,
  errorLink,
  authLink,
  stateLink,
  privateHttpLink,
])

export const publicLink = ApolloLink.from([
  retryLink,
  errorLink,
  stateLink,
  publicHttpLink,
])

export const privateClient = new ApolloClient({
  link: privateLink,
  cache,
})

export const publicClient = new ApolloClient({
  link: publicLink,
  cache,
})

privateClient.onResetStore(stateLink.writeDefaults)
