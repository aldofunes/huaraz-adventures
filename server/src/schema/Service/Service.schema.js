import Service from './Service'
import { findTranslation } from 'lib/i18n'
import { authorize } from 'lib/auth'

export const schema = `
type Service {
  id: ID!
  name(localeCode: String!): String!
  
  createdAt: DateTime!
  modifiedAt: DateTime!
}

extend type RootQuery {
  service(id: ID slug: String): Service!
  services(limit: Int): [Service]!
  servicesCount: Int!
}

extend type RootMutation {
  createService(
    localeCode: String!
    name: String!
  ): Service
  
  updateService(
    id: ID!
    localeCode: String!
    name: String!
  ): Service
  
  deleteService(id: ID!): Boolean
}
`

export const resolvers = {
  Service: {
    name: ({ i18n }, { localeCode }) => findTranslation(i18n, localeCode).name,
  },

  RootQuery: {
    service: (root, { id, slug }) => id ? Service.get(id) : Service.findBySlug(slug),
    services: (root, { limit }) => Service.scan({ Limit: limit }),
    servicesCount: () => Service.count(),
  },


  RootMutation: {
    createService: (root, args) => Service.create({ i18n: [args] }),

    updateService: (root, { id, localeCode, ...args }, { jwt }) => authorize(jwt)
      .then(() => Service.get(id))
      .then(service => Service.update(id, {
        i18n: [
          ...service.i18n.filter(i => i.localeCode !== localeCode),
          { localeCode: localeCode, args },
        ],
      })),

    deleteService: (root, { id }) => Service.delete(id),
  },
}
