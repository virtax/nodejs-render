import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1736275927466 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `CREATE TABLE "users"
        (
         id serial,
         name text NOT NULL,
         email text NOT NULL,
         age integer NOT NULL,
         salary integer,
         primary key (id)
        )
        `,
      );
      await queryRunner.query(`CREATE INDEX "IDX_51b8b26ac168fbe7d6f5653e6c" ON "users" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP INDEX "public"."IDX_51b8b26ac168fbe7d6f5653e6c"`);
      await queryRunner.query(`DROP TABLE "users"`)
    }

}
