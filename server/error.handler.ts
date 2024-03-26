import * as restify from 'restify'

export const handleError = (
  req: restify.Request,
  resp: restify.Response,
  err,
  callback
) => {
  err = {}

  switch (err.name) {
    case 'ResourceNotFound':
      err.statusCode = 404
      break
    case 'ValidationError':
      err.statusCode = 400
      break
  }
  return callback()
}
