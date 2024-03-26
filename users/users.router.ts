import { Server } from 'restify'
import { ModelRouter } from '../common/model-router'
import { User } from './users.model'
import { authenticate } from '../security/auth.handler'
import { authorize } from '../security/authz.handler'

class UsersRouter extends ModelRouter<User> {
  constructor() {
    super(User)
  }

  findByEmail = async (req, resp, next) => {
    if (req.query.email) {
      try {
        const user = User.findByEmail(req.query.email)
        resp.json(user)
        return next()
      } catch (error) {
        next(error)
      }
    } else {
      return next()
    }
  }

  applyRoutes(application: Server) {
    application.get('/users', [authorize('admin'), this.findAll])
    application.get('/users/:id', [this.validateId, this.findById])
    application.post('/users', this.save)
    application.put('/users/:id', [this.validateId, this.update])
    application.del('/users/:id', [this.validateId, this.delete])
    application.post('/users/authenticate', authenticate)
  }
}

export const usersRouter = new UsersRouter()
