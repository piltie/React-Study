import { Router } from 'express'

import { PurchaseController } from './controllers/PurchaseController'

const routes = Router();

const purchaseController = new PurchaseController()

routes.post('/purchase', purchaseController.create)
routes.get('/purchase', purchaseController.index)
routes.delete('/purchase/:id', purchaseController.delete)

export { routes }

