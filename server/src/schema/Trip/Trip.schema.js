import { authorize } from 'lib/auth'
import { findTranslation } from 'lib/i18n'
import Tour from 'schema/Tour'
import Trip from './Trip'

export const schema = `
type Trip {
  id: ID!
  duration(localeCode: String!): String!
  image: URL!
  summary(localeCode: String!): String!
  title(localeCode: String!): String!
  tours: [Tour]!
}

extend type RootQuery {
  trip(id: ID slug: String): Trip!
  trips(limit: Int): [Trip]!
  tripsCount: Int!
}

extend type RootMutation {
  createTrip(
    duration: String!
    image: URL!
    localeCode: String!
    summary: String!
    title: String!
    tourIds: [ID!]!
  ): Trip
  
  updateTrip(
    id: ID!
    duration: String!
    image: URL!
    localeCode: String!
    summary: String!
    title: String!
    tourIds: [ID!]!
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

    tours({ tourIds }) {
      return Tour.query({
        KeyConditions: { id: { ComparisonOperator: 'EQ', AttributeValueList: tourIds } },
      })
    },
  },

  RootQuery: {
    trip: (root, { id, slug }) => id ? Trip.get(id) : Trip.findBySlug(slug),
    trips: () => Trip.scan(),
    tripsCount: () => Trip.count(),
  },

  RootMutation: {
    createTrip(root, { image, tourIds, ...args }, { jwt }) {
      return authorize(jwt)
        .then(user => Trip.create({
          image,
          tourIds,
          i18n: [args],
          userId: user.id,
        }))
    },

    updateTrip(root, { id, image, tourIds, localeCode, ...args }, { jwt }) {
      return authorize(jwt)
        .then(() => Trip.get(id))
        .then(trip => Trip.update(id, {
          image,
          tourIds,
          i18n: [
            ...trip.i18n.filter(i => i.localeCode !== localeCode),
            { localeCode: localeCode, ...args },
          ],
        }))
    },

    deleteTrip(root, { id }, { jwt }) {
      return authorize(jwt)
        .then(() => Trip.delete(id))
    },
  },
}
