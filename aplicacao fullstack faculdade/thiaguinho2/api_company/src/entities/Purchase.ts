import { Entity, CreateDateColumn, UpdateDateColumn, PrimaryColumn, Column } from 'typeorm'

import { v4 as uuid } from 'uuid' // identificador universal unico

@Entity('purchase')
class Purchase {

  @PrimaryColumn()
  id: string;

  @Column()
  purchase_date: Date;

  @Column()
  product: string;

  @Column()
  amount: number;

  @Column()
  unitary_value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Purchase }
