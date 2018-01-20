import { SIGN_IN, SIGN_OUT } from './actionTypes'

const signIn = payload => ({
  type: SIGN_IN,
  payload,
})

const signOut = payload => ({
  type: SIGN_OUT,
  payload,
})

export { signIn, signOut }
