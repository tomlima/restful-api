import { Server } from 'restify'
import { ModelRouter } from '../common/model-router'
import { Product } from './products.model'

class ProductRouter extends ModelRouter<Product> {
  constructor() {
    super(Product)
  }

  applyRoutes(application: Server) {
    application.get('/products', this.findAll)
    application.get('/products/:id', [this.validateId, this.findById])
    application.post('/products', this.save)
    application.put('/products/:id', [this.validateId, this.update])
    application.del('/products/:id', [this.validateId, this.delete])
  }
}

export const productRouter = new ProductRouter()
