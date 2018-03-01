# The climbing guides' website

# Why this repo?

TODO: This sections needs explaining

# Why open source?

TODO: This sections needs explaining

# Overview

This is the [Huaraz Adventures](https://www.huaraz-adventures.com) website's repo.

It is built using a serverless JAMstack.

- [Serverless](https://serverless.com/)
- [Apollo Server Lambda](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-lambda)
- [React](https://reactjs.org/)
- [Apollo client](https://www.apollographql.com/docs/react/)
- [DynamoDB](https://aws.amazon.com/dynamodb) as persistance layer
- [CloudFront](https://aws.amazon.com/cloudfront) as a CDN

# Start dev server

1. Install awscli
2. Yarn install
3. Yarn start server
4. Yarn start client

# Test the code (Mocha)

```bash
yarn test
```

# Deploy the website

```bash
(cd server/ && yarn deploy)
(cd client/ && yarn deploy)
```

This document is very much a work in progress
