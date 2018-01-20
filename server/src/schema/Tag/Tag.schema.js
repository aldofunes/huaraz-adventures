import { authorize } from 'lib/auth'
import { findTranslation } from 'lib/i18n'
import Tag from './Tag'

export const schema = `
type Tag {
  id: ID!
  slug: String!
  name(localeCode: String!): String!
  
  author: User!
  createdAt: DateTime!
  modifiedAt: DateTime!
}

extend type RootQuery {
  tag(id: ID slug: String): Tag!
  tags(limit: Int): [Tag]!
  tagsCount: Int!
}

extend type RootMutation {
  createTag(
    slug: String!
    localeCode: String!
    name: String!
  ): Tag
  
  updateTag(
    id: ID!
    slug: String!
    localeCode: String!
    name: String!
  ): Tag
  
  deleteTag(id: ID!): Boolean
}
`

export const resolvers = {
  Tag: {
    name({ i18n }, { localeCode }) {
      return findTranslation(i18n, localeCode).name
    },
  },

  RootQuery: {
    tag(root, { id, slug }) {
      if (slug) { return Tag.getBySlug(id) }
      return Tag.get(id)
    },
    tags() {
      return Tag.scan()
    },
    tagsCount() {
      return Tag.count()
    },
  },

  RootMutation: {
    createTag(root, { slug, ...args }, { jwt }) {
      return authorize(jwt)
        .then(user => Tag.create({
          slug,
          i18n: [args],
          userId: user.id,
        }))
    },

    updateTag(root, { id, slug, ...args }, { jwt }) {
      return authorize(jwt)
        .then(() => Tag.get(id))
        .then(tag => Tag.update(id, {
          slug,
          i18n: [...tag.i18n.filter(i => i.localeCode !== args.localeCode), args],
        }))
    },

    deleteTag(root, { id }) {
      return Tag.delete(id)
    },
  },
}
