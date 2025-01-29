import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPassword1736882560834 implements MigrationInterface {
    name = 'AddUserPassword1736882560834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordHash" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordHash"`);
    }

}
