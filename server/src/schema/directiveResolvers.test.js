import { expect } from 'chai'
import { UnauthorizedError } from 'lib/errors'
import { spy } from 'sinon'
import auth from './directiveResolvers'

describe('directiveResolvers', () => {
  describe('auth', () => {
    it('should call next when a userId is valid', () => {
      const next = spy()

      auth.auth(next, {}, {}, { userId: '65090932-c6a6-45e5-928f-690a73ba973e' })
      expect(next.calledOnce).to.equal(true)
    })

    it('should fail when userId is not defined', () => {
      const next = spy()

      expect(() => auth.auth(next, {}, {}, {})).to.throw(UnauthorizedError)
      expect(next.notCalled).to.equal(true)
    })
  })
})
