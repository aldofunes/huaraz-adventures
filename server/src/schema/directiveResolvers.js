import { UnauthorizedError } from 'lib/errors'

export default {
  auth(next, src, args, { userId }) {
    if (!userId) { throw new UnauthorizedError() }

    return next()
  },
}