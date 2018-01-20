import { createError } from 'apollo-errors'

export const UnauthorizedError = createError('UnauthorizedError', {
  message: 'You are not authorized',
})

export const ForbiddenError = createError('ForbiddenError', {
  message: 'You are not allowed to do this',
})

export const NotFoundError = createError('NotFoundError', {
  message: 'The item was not found',
})

