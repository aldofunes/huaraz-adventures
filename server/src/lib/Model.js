import docClient from 'lib/docClient'
import { NotFoundError } from 'lib/errors'
import uuid from 'uuid'

export default class Model {
  /**
   * Build a Model with a tableName
   * @param collection {string} collection The name of the DynamoDB collection
   */
  constructor({ tableName }) {
    this.tableName = tableName
  }

  // region Read Methods
  get(Key) {
    return docClient
      .get({ TableName: this.tableName, Key })
      .promise()
      .then(data => data.Item)
  }

  batchGet(Keys, args) {
    if (!Keys || Keys.length === 0) { return null }

    return docClient.batchGet({ RequestItems: { [this.tableName]: { Keys }, ...args } })
      .promise()
      .then(data => data.Responses[this.tableName])
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

  // endregion

  //region Write Methods
  create(doc) {
    const id = uuid.v4()
    return docClient.put({
      TableName: this.tableName,
      Item: { id, ...doc, createdAt: Date.now(), modifiedAt: Date.now() },
    }).promise().then(() => this.get({ id }))
  }

  update(Key, doc) {
    return this.get(Key)
      .then((item) => {
        if (!item) { throw new NotFoundError() }

        return docClient.put({
          TableName: this.tableName,
          Item: { ...item, ...doc, modifiedAt: Date.now() },
        }).promise()
      })
      .then(() => this.get(Key))
  }

  upsert(Key, doc) {
    return this.get(Key)
      .then((item) => {
        let Item = { ...item, ...doc, modifiedAt: Date.now() }

        if (!item) {
          Item = { ...Item, ...Key, createdAt: Date.now() }
        }

        return docClient.put({ TableName: this.tableName, Item }).promise()
      })
      .then(() => this.get(Key))
  }

  delete(Key) {
    return this.get(Key)
      .then(item => {
        if (!item) { throw new NotFoundError() }

        return docClient.delete({ TableName: this.tableName, Key }).promise()
      })
      .then(() => true)
  }

  //endregion
}