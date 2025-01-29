import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSales1736531481609 implements MigrationInterface {
    name = 'CreateSales1736531481609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sales" ("id" SERIAL NOT NULL, "product" text NOT NULL, "amount" integer NOT NULL, "price" money NOT NULL, "userid" integer, CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c105d05b42c4bf45fd73aee1e2" ON "sales" ("product") `);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_12ce991d00f1bc09df4c9ea594a" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_12ce991d00f1bc09df4c9ea594a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c105d05b42c4bf45fd73aee1e2"`);
        await queryRunner.query(`DROP TABLE "sales"`);
    }

}
