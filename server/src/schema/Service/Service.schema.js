import { findTranslation } from 'lib/i18n'
import Service from './Service'

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
    service(root, { id, slug }) {
      return id ? Service.get(id) : Service.findBySlug(slug)
    },
    services(root, { limit }) {
      return Service.scan({ Limit: limit })
    },
    servicesCount() {
      return Service.count()
    },
  },


  RootMutation: {
    createService(root, args) {
      return Service.create({ i18n: [args] })
    },

    updateService(root, { id, localeCode, ...args }) {
      return Service.get(id)
        .then(service => Service.update(id, {
          i18n: [
            ...service.i18n.filter(i => i.localeCode !== localeCode),
            { localeCode: localeCode, args },
          ],
        }))
    },

    deleteService(root, { id }) {
      return Service.delete(id)
    },
  },
}
