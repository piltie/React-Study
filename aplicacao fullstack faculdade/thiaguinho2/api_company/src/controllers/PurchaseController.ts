import { Request, Response } from 'express'
import { PurchaseServices } from '../services/PurchaseServices'

class PurchaseController {

  async create(request: Request, response: Response) {
    let { purchase_date, product, amount, unitary_value } = request.body
    purchase_date = new Date(purchase_date)
    const purchaseServices = new PurchaseServices()
    try {
      const purchase = await purchaseServices.create({ purchase_date, product, amount, unitary_value })
      return response.json(purchase)
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message })
    }
  }

  async index(request: Request, response: Response) {
    const purchaseServices = new PurchaseServices()

    try {
      const purchase = await purchaseServices.index()
      return response.json(purchase)
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message })
    }
  }

  async delete(request: Request, response: Response) {
    const purchaseServices = new PurchaseServices()
    const { id } = request.params

    try {
      const purchase = await purchaseServices.delete({ id })
      return response.json({ message: 'purchase id deleted successfully !!' })
    } catch (err) {
      return response
        .status(400)
        .json({ message: err.message })
    }
  }
}

export { PurchaseController }

