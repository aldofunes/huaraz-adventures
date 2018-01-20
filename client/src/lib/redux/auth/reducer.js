import { SIGN_IN, SIGN_OUT } from './actionTypes'

export default (state = [], { type, payload }) => {
  switch (type) {
    case SIGN_IN:
      localStorage.setItem('jwt', payload.jwt)
      return { jwt: payload.jwt }

    case SIGN_OUT:
      localStorage.clear()
      return {}

    default:
      return state
  }
}
