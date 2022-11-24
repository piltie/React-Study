import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompany1655641603582 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "purchase",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "purchase_date",
                        type: "date"
                    },
                    {
                        name: "product",
                        type: "varchar"
                    },
                    {
                        name: "amount",
                        type: "number"
                    },
                    {
                        name: "unitary_value",
                        type: "number"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("purchase")
    }

}
