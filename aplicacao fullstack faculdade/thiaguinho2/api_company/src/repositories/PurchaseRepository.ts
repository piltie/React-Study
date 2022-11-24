import { Repository, EntityRepository } from 'typeorm'
import { Purchase } from '../entities/Purchase'

@EntityRepository(Purchase)
class PurchaseRepository extends Repository<Purchase> {

}

export { PurchaseRepository }

