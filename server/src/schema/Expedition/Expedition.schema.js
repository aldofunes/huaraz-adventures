import { authorize } from 'lib/auth'
import { findTranslation } from 'lib/i18n'
import Tag from 'schema/Tag'
import Expedition from './Expedition'

export const schema = `
type Expedition {
  id: ID!
  altitud: Int
  summary(localeCode: String!): String
  difficulty: String
  duration(localeCode: String!): String
  itinerary(localeCode: String!): String
  image: String
  lists(localeCode: String!): [ServiceList]
  location(localeCode: String!): String
  name(localeCode: String!): String
  season(localeCode: String!): String
  tags: [Tag]
  
  createdAt: DateTime!
  modifiedAt: DateTime!
}

type ServiceList {
  name: String
  body: String
}

input ServiceListInput {
  name: String
  body: String
}

extend type RootQuery {
  expedition(id: ID slug: String): Expedition!
  expeditions(limit: Int): [Expedition]!
  expeditionsCount: Int!
}

extend type RootMutation {
  createExpedition(
    altitud: Int
    summary: String
    difficulty: String
    duration: String
    image: String
    itinerary: String
    lists: [ServiceListInput]
    localeCode: String
    location: String
    name: String
    season: String
    tagIds: [ID]
  ): Expedition
  
  updateExpedition(
    id: ID!
    altitud: Int
    summary: String
    difficulty: String
    duration: String
    image: String
    itinerary: String
    lists: [ServiceListInput]
    localeCode: String
    location: String
    name: String
    season: String
    tagIds: [ID]
  ): Expedition
  
  deleteExpedition(id: ID!): Boolean
}
`

export const resolvers = {
  Expedition: {
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
      return Tag.scan({
        FilterExpression: 'contains(:tagIds, id)',
        ExpressionAttributeValues: { ':tagIds': tagIds },
      })
    },
  },

  RootQuery: {
    expedition(root, { id, slug }) {
      return id ? Expedition.get(id) : Expedition.findBySlug(slug)
    },
    expeditions() {
      return Expedition.scan()
    },
    expeditionsCount() {
      return Expedition.count()
    },
  },

  RootMutation: {
    createExpedition(root, { altitud, difficulty, image, tagIds, ...args }, { jwt }) {
      return authorize(jwt)
        .then(user => Expedition.create({
          altitud,
          difficulty,
          image,
          tagIds,
          i18n: [args],
          userId: user.id,
        }))
    },

    updateExpedition(root, { id, altitud, difficulty, image, tagIds, ...args }, { jwt }) {
      return authorize(jwt)
        .then(() => Expedition.get(id))
        .then(({ i18n = [] }) => Expedition.update(id, {
          altitud,
          difficulty,
          image,
          tagIds,
          i18n: [...i18n.filter(i => i.localeCode !== args.localeCode), args],
        }))
    },

    deleteExpedition(root, { id }) {
      return Expedition.delete(id)
    },
  },
}
