import Model from 'lib/Model'
import docClient from 'lib/docClient'

class Category extends Model {
  getBySlug({ slug, localeCode }) {
    return docClient
      .query({
        TableName: this.tableName,
        IndexName: 'slug-localeCode-index',
        KeyConditionExpression: 'slug = :slug AND localeCode = :localeCode',
        ExpressionAttributeValues: { ':slug': slug, ':localeCode': localeCode },
      })
      .promise()
      .then(data => data.Items[0])
  }
}

export default new Category({ tableName: process.env.TABLE_CATEGORIES })
