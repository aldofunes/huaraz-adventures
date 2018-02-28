export default {
  defaults: {
    locale: {
      __typename: 'Locale',
      code: localStorage.getItem('localeCode')
      || navigator.languages.find(ln => ['es', 'en'].includes(ln))
      || 'es',
    },
  },

  resolvers: {
    Query: {},
    Mutation: {
      setLocale: (_, { code }, { cache }) => {
        const data = {
          locale: { __typename: 'Locale', code },
        }
        cache.writeData({ data })
        return null
      },
    },
  },
}
