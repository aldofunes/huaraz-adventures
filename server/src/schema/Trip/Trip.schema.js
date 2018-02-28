import { findTranslation } from 'lib/i18n'
import Expedition from 'schema/Expedition'
import Trip from './Trip'

export const schema = `
type Trip {
  id: ID!
  duration(localeCode: String!): String!
  image: String!
  summary(localeCode: String!): String!
  title(localeCode: String!): String!
  expeditions: [Expedition]!
}

extend type RootQuery {
  trip(id: ID slug: String): Trip!
  trips(limit: Int): [Trip]!
  tripsCount: Int!
}

extend type RootMutation {
  createTrip(
    duration: String!
    image: String!
    localeCode: String!
    summary: String!
    title: String!
    expeditionIds: [ID!]!
  ): Trip
  
  updateTrip(
    id: ID!
    duration: String!
    image: String!
    localeCode: String!
    summary: String!
    title: String!
    expeditionIds: [ID!]!
  ): Trip
  
  deleteTrip(id: ID!): Boolean
}
`

export const resolvers = {
  Trip: {

    summary({ i18n }, { localeCode }) {
      return findTranslation(i18n, localeCode).summary
    },

    duration({ i18n }, { localeCode }) {
      return findTranslation(i18n, localeCode).duration
    },

    title({ i18n }, { localeCode }) {
      return findTranslation(i18n, localeCode).title
    },

    expeditions({ expeditionIds }) {
      return Expedition.query({
        KeyConditions: { id: { ComparisonOperator: 'EQ', AttributeValueList: expeditionIds } },
      })
    },
  },

  RootQuery: {
    trip: (root, { id, slug }) => id ? Trip.get(id) : Trip.findBySlug(slug),
    trips: () => Trip.scan(),
    tripsCount: () => Trip.count(),
  },

  RootMutation: {
    createTrip(root, { image, expeditionIds, ...args }, { userid }) {
      return Trip.create({
        image,
        expeditionIds,
        i18n: [args],
        userId,
      })
    },

    updateTrip(root, { id, image, expeditionIds, localeCode, ...args }) {
      return Trip.get(id)
        .then(trip => Trip.update(id, {
          image,
          expeditionIds,
          i18n: [
            ...trip.i18n.filter(i => i.localeCode !== localeCode),
            { localeCode: localeCode, ...args },
          ],
        }))
    },

    deleteTrip(root, { id }) {
      return Trip.delete(id)
    },
  },
}
