const { v4 } = require('uuid')
import docClient from 'lib/docClient'

export default class Model {
  /**
   * Build a Model with a collection and a scope. `deletedAt: null` is always included in the
   * default scope
   * @param collection {string} collection The name of the MongoDB collection
   * @param defaultScope {Object} defaultScope The query options for the default scope
   * @param indices {Array<Object>} indices An array of the indices to create
   */
  constructor({ tableName }) {
    this.tableName = tableName
  }

  get(id) {
    return docClient
      .get({ TableName: this.tableName, Key: { id } })
      .promise()
      .then(data => data.Item)
  }

  query(args) {
    return docClient
      .query({ TableName: this.tableName, ...args })
      .promise()
      .then(data => data.Items)
  }

  scan(args) {
    return docClient
      .scan({ TableName: this.tableName, ...args })
      .promise()
      .then(data => data.Items)
  }

  count(args) {
    return docClient.scan({ TableName: this.tableName, Select: 'COUNT', ...args })
      .promise()
      .then(data => data.Count)
  }

  create(doc) {
    doc.id = v4()
    doc.createdAt = Date.now()
    doc.modifiedAt = Date.now()
    return docClient.put({
      TableName: this.tableName,
      Item: doc,
      ConditionalExpression: 'attribute_not_exists(id)',
    }).promise().then(() => doc)
  }

  upsert(doc) {
    doc.modifiedAt = Date.now()
    return docClient.put({
      TableName: this.tableName,
      Item: doc,
    }).promise().then(() => doc)
  }

  update(id, doc) {
    return docClient.get({ TableName: this.tableName, Key: { id } })
      .promise()
      .then(({ Item }) => {
        if (!Item) { throw new Error('Item does not exist') } else {

          return docClient.put({
            TableName: this.tableName,
            Item: Object.assign({}, Item, doc),
          }).promise().then(() => Object.assign({}, Item, doc))
        }
      })
  }

  delete(id) {
    return docClient.delete({ TableName: this.tableName, Key: { id } })
      .promise()
      .then(() => true)
      .catch(() => false)
  }
}
