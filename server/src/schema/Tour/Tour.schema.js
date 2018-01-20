import { authorize } from 'lib/auth'
import { findTranslation } from 'lib/i18n'
import Tag from 'schema/Tag'
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
  tags: [Tag]
  
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
    tagIds: [ID]
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
    tagIds: [ID]
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

    tags({ tagIds = ['empty'] }) {
      return Tag.query({
        KeyConditions: { id: { ComparisonOperator: 'EQ', AttributeValueList: tagIds } },
      })
    },
  },

  RootQuery: {
    tour(root, { id, slug }) {
      return id ? Tour.get(id) : Tour.findBySlug(slug)
    },
    tours() {
      return Tour.scan()
    },
    toursCount() {
      return Tour.count()
    },
  },

  RootMutation: {
    createTour(root, { altitud, difficulty, image, tagIds, ...args }, { jwt }) {
      return authorize(jwt)
        .then(user => Tour.create({
          altitud,
          difficulty,
          image,
          tagIds,
          i18n: [args],
          userId: user.id,
        }))
    },

    updateTour(root, { id, altitud, difficulty, image, tagIds, ...args }, { jwt }) {
      return authorize(jwt)
        .then(() => Tour.get(id))
        .then(({ i18n = [] }) => Tour.update(id, {
          altitud,
          difficulty,
          image,
          tagIds,
          i18n: [...i18n.filter(i => i.localeCode !== args.localeCode), args],
        }))
    },

    deleteTour(root, { id }) {
      return Tour.delete(id)
    },
  },
}
