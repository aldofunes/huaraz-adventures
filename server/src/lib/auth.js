import { pbkdf2, pbkdf2Sync, randomBytes } from 'crypto'
import JWT from 'jsonwebtoken'
import { UnauthorizedError } from './errors'

/**
 * Check if a user is authorized to execute an action
 *
 * @param {String} jwt
 * @returns {Promise} Promise representing the user data contained in the JWT
 */
export const authorize = jwt => new Promise((resolve, reject) => {
  JWT.verify(jwt, process.env.PRIVATE_KEY, (error, user) => {
    if (error) {
      reject(new UnauthorizedError({
        data: { message: error.message },
      }))
    } else {
      resolve(user)
    }
  })
})

/**
 * Verifies if a JWT is valid and returns a promise
 * @param jwt
 */
export const sessionIsValid = jwt => new Promise((resolve) => {
  JWT.verify(jwt, process.env.PRIVATE_KEY, (error, user) => {
    error && resolve(false)
    user && resolve(true)
  })
})

// larger numbers mean better security, less
const config = {
  // size of the generated hash
  hashBytes: 32,
  // larger salt means hashed passwords are more resistant to rainbow table, but
  // you get diminishing returns pretty fast
  saltBytes: 16,
  // more iterations means an attacker has to take longer to brute force an
  // individual password, so larger is better. however, larger also means longer
  // to hash the password. tune so that hashing the password takes about a
  // second
  iterations: 20000,
}

/**
 * Hash a password using Node's pbkdf2 (key derivation) function.
 *
 * Returns a self-contained buffer which can be arbitrarily encoded for storage
 * that contains all the data needed to verify a password.
 *
 * @param {!String} password
 */
export const hashPassword = (password) => {
  // generate a salt for pbkdf2
  const salt = randomBytes(config.saltBytes)
  const hash = pbkdf2Sync(password, salt, config.iterations, config.hashBytes, 'sha512')
  const passwordDigest = Buffer.alloc(hash.length + salt.length + 8)

  // include the size of the salt so that we can, during verification,
  // figure out how much of the hash is salt
  passwordDigest.writeUInt32BE(salt.length, 0, true)
  // similarly, include the iteration count
  passwordDigest.writeUInt32BE(config.iterations, 4, true)

  salt.copy(passwordDigest, 8)
  hash.copy(passwordDigest, salt.length + 8)
  return passwordDigest.toString('base64')
}

/**
 * Verify a password using Node's pbkdf2 (key derivation) function.
 *
 * Accepts a hash and salt generated by hashPassword, and returns whether the
 * hash matched the password (as a boolean).
 *
 * @param {!String} password
 * @param {!String} passwordDigest Buffer containing hash and salt as generated by hashPassword.
 *
 * @return Promise
 */
export const verifyPassword = (password, passwordDigest) => {
  return new Promise((resolve, reject) => {
    const buffer = Buffer.from(passwordDigest, 'base64')
    // extract the salt and hash from the combined buffer
    const saltBytes = buffer.readUInt32BE(0)
    const hashBytes = buffer.length - saltBytes - 8
    const iterations = buffer.readUInt32BE(4)
    const salt = buffer.slice(8, saltBytes + 8)
    const hash = buffer.toString('binary', saltBytes + 8)

    // verify the salt and hash against the password
    pbkdf2(password, salt, iterations, hashBytes, 'sha512', (error, verificationHash) => {
      if (error) { reject(error) }

      // Callback with a boolean indicating if the password matches the stored hash
      resolve(verificationHash.toString('binary') === hash)
    })
  })
}

export const generatePassword = (length) => {
  let password = ''
  let character

  while (length > password.length) {
    if (password.indexOf(character =
        String.fromCharCode(Math.floor(Math.random() * 94) + 33), Math.floor(password.length / 94) *
        94) < 0) {
      password += character
    }
  }
  return password
}
