import Article from '../Article'
import Category from './Category'

export const schema = `
type Category {
  id: ID!
  name: String
  slug: String
  type: Type
  articles(limit: Int = 10): [Article]
}

extend type RootQuery {
  category(id: ID!): Category @auth(action: "Categories:Get")
  categories(type: Type!): [Category] @auth(action: "Categories:List")
  
  publicCategory(id: ID!): Category
  publicCategoryBySlug(slug: String!): Category
  publicCategories(type: Type!): [Category]
}

extend type RootMutation {
  createCategory(
    name: String!
    slug: String!
    type: Type!
  ): Category @auth(action: "Categories:Create")
  
  updateCategory(
    id: ID!
    name: String!
    slug: String!
    type: Type!
  ): Category @auth(action: "Categories:Update")
  
  deleteCategory(id: ID!): Boolean @auth(action: "Categories:Delete")
}
`

export const resolvers = {
  Category: {
    articles({ id }, { limit }, { localeCode }) {
      return Article.query({
        IndexName: 'categoryId-localeCode-index',
        KeyConditionExpression: 'categoryId = :categoryId and localeCode = :localeCode',
        ExpressionAttributeValues: { ':categoryId': id, ':localeCode': localeCode },
        Limit: limit,
      })
    },
  },

  RootQuery: {
    category(root, { id }, { localeCode }) {
      return Category.get({ id, localeCode })
    },

    categories(root, { type }, { localeCode }) {
      return Category.query({
        IndexName: 'type-localeCode-index',
        KeyConditionExpression: '#type = :type and localeCode = :localeCode',
        ExpressionAttributeValues: { ':localeCode': localeCode, ':type': type },
        ExpressionAttributeNames: { '#type': 'type' },
      })
    },

    publicCategory(root, { id }, { localeCode }) {
      return Category.get({ id, localeCode })
    },

    publicCategoryBySlug(root, { slug }, { localeCode }) {
      return Category.getBySlug({ slug, localeCode })
    },

    publicCategories(root, { type }, { localeCode }) {
      return Category.query({
        IndexName: 'type-localeCode-index',
        KeyConditionExpression: '#type = :type and localeCode = :localeCode',
        ExpressionAttributeValues: { ':localeCode': localeCode, ':type': type },
        ExpressionAttributeNames: { '#type': 'type' },
      })
    },
  },

  RootMutation: {
    createCategory(root, args, { localeCode }) {
      return Category.create({ localeCode, ...args })
    },

    updateCategory(root, { id, ...args }, { localeCode }) {
      return Category.upsert({ id, localeCode }, args)
    },

    deleteCategory(root, { id }, { localeCode }) {
      return Category.delete({ id, localeCode })
    },
  },
}

