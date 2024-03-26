import { Router } from './router'
import * as mongoose from 'mongoose'
import { NotFoundError } from 'restify-errors'

export abstract class ModelRouter<D extends mongoose.Document> extends Router {
  constructor(protected model: mongoose.Model<D>) {
    super()
  }

  validateId = (req, resp, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      next(new NotFoundError('Document not found'))
    } else {
      next()
    }
  }

  findAll = async (req, resp, next) => {
    let page = parseInt(req.query._page || 1)
    let pageSize = parseInt(req.query._pageSize || 5)
    page = page > 0 ? page : 1
    pageSize = pageSize > 0 ? pageSize : 5
    const skip = (page - 1) * pageSize
    try {
      const users = await this.model.find().limit(pageSize).skip(skip)
      resp.json(users)
      return next()
    } catch (error) {
      next(error)
    }
  }

  findById = async (req, resp, next) => {
    try {
      const user = await this.model.findById(req.params.id)
      resp.json(user)
      return next()
    } catch (error) {
      next(error)
    }
  }

  save = async (req, resp, next) => {
    try {
      let user = new this.model(req.body)
      const result = await user.save()
      resp.json(result)
      return next()
    } catch (error) {
      next(error)
    }
  }

  update = async (req, resp, next) => {
    const options = { runValidators: true }
    try {
      const result = await this.model.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        options
      )
      resp.json(result)
      return next()
    } catch (err) {
      next(err)
    }
  }

  delete = async (req, resp, next) => {
    try {
      await this.model.deleteOne({ _id: `${req.params.id}` })
      resp.send(204)
    } catch (err) {
      if (err.kind === 'ObjectId') {
        resp.send(404)
      }
      resp.send(500)
    }
    return next()
  }
}
