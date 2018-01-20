import { authorize } from 'lib/auth'
import { findTranslation } from 'lib/i18n'
import Tour from './Tour'

export const schema = `
type Tour {
  id: ID!
  altitud: Int!
  summary(localeCode: String!): String!
  difficulty: String!
  duration(localeCode: String!): String!
  itinerary(localeCode: String!): String!
  image: URL!
  lists(localeCode: String!): [ServiceList]!
  location(localeCode: String!): String!
  name(localeCode: String!): String!
  season(localeCode: String!): String!
  
  createdAt: DateTime!
  modifiedAt: DateTime!
}

type ServiceList {
  name: String!
  body: String!
}

input ServiceListInput {
  name: String!
  body: String!
}

extend type RootQuery {
  tour(id: ID slug: String): Tour!
  tours(limit: Int): [Tour]!
  toursCount: Int!
}

extend type RootMutation {
  createTour(
    altitud: Int!
    summary: String!
    difficulty: String!
    duration: String!
    image: URL!
    itinerary: String!
    lists: [ServiceListInput]!
    localeCode: String!
    location: String!
    name: String!
    season: String!
  ): Tour
  
  updateTour(
    id: ID!
    altitud: Int!
    summary: String!
    difficulty: String!
    duration: String!
    image: URL!
    itinerary: String!
    lists: [ServiceListInput]!
    localeCode: String!
    location: String!
    name: String!
    season: String!
  ): Tour
  
  deleteTour(id: ID!): Boolean
}
`

export const resolvers = {
  Tour: {
    summary({ i18n }, { localeCode }) {
      return findTranslation(i18n, localeCode).summary
    },

    duration({ i18n }, { localeCode }) {
      return findTranslation(i18n, localeCode).duration
    },

    itinerary({ i18n }, { localeCode }) {
      return findTranslation(i18n, localeCode).itinerary
    },

    lists({ i18n }, { localeCode }) {
      return findTranslation(i18n, localeCode).lists
    },

    location({ i18n }, { localeCode }) {
      return findTranslation(i18n, localeCode).location
    },

    name({ i18n }, { localeCode }) {
      return findTranslation(i18n, localeCode).name
    },

    season({ i18n }, { localeCode }) {
      return findTranslation(i18n, localeCode).season
    },

  },

  RootQuery: {
    tour: (root, { id, slug }) => id ? Tour.get(id) : Tour.findBySlug(slug),
    tours: () => Tour.scan(),
    toursCount: () => Tour.count(),
  },

  RootMutation: {
    createTour: (root, { altitud, difficulty, image, ...args }, { jwt }) => authorize(jwt)
      .then(user => Tour.create({
        altitud,
        difficulty,
        image,
        i18n: [args],
        userId: user.id,
      })),

    updateTour: (root, { id, altitud, difficulty, image, localeCode, ...args }, { jwt }) => authorize(jwt)
      .then(() => Tour.get(id))
      .then(tour => Tour.update(id, {
        altitud,
        difficulty,
        image,
        i18n: [
          ...tour.i18n.filter(i => i.localeCode !== localeCode),
          { localeCode: localeCode, ...args },
        ],
      })),

    deleteTour: (root, { id }) => Tour.delete(id),
  },
}
