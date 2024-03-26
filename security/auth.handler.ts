import * as restify from 'restify'
import { User } from '../users/users.model'
import { NotAuthorizedError } from 'restify-errors'
import * as jwt from 'jsonwebtoken'
import { enviroment } from '../common/enviroment'

export const authenticate: restify.RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findByEmail(email, '+password')
    if (user && user.matches(password)) {
      const token = jwt.sign(
        { sub: user.email, iss: 'api' },
        enviroment.security.apiSecret
      )
      res.json({ name: user.name, email: user.email, accessToken: token })
      return next(false)
    } else {
      return next(new NotAuthorizedError('Invalid credentials'))
    }
  } catch (error) {
    next(error)
  }
}
