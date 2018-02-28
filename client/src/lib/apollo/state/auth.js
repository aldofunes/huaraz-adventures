export default {
  defaults: {
    auth: { __typename: 'Auth', jwt: null },
  },

  resolvers: {
    Query: {},
    Mutation: {
      setJwt: (root, { jwt }, { cache }) => {
        cache.writeData({
          data: {
            auth: { __typename: 'Auth', jwt },
          },
        })

        return null
      },

      signOut: (root, args, { cache }) => {
        cache.writeData({
          data: {
            auth: { __typename: 'Auth', jwt: null },
          },
        })

        return null
      },
    },
  },
}
