import { getCustomRepository } from 'typeorm'
import { PurchaseRepository } from '../repositories/PurchaseRepository'

interface IPruchaseCreate {
  purchase_date: Date;
  product: string;
  amount: number;
  unitary_value: number;
}

interface IPruchaseShow {
  id: string
}

class PurchaseServices {

  async create({ purchase_date, product, amount, unitary_value }: IPruchaseCreate) {

    const purchaseProvider = getCustomRepository(PurchaseRepository)
    const purchase = purchaseProvider.create({
      purchase_date,
      product,
      amount,
      unitary_value,
    })

    await purchaseProvider.save(purchase)

    return purchase
  }

  async index() {
    const purchaseProvider = getCustomRepository(PurchaseRepository)

    const purchase = await purchaseProvider.find()

    return purchase;
  }

  async delete({ id }: IPruchaseShow) {
    const purchaseProvider = getCustomRepository(PurchaseRepository)

    const purchase = await purchaseProvider.findOne({ id })

    if (!purchase) {
      throw new Error('Purchase id not found!!')
    }

    return await purchaseProvider.delete({ id })
  }

}

export { PurchaseServices }