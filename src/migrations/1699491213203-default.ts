import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1699491213203 implements MigrationInterface {
    name = 'Default1699491213203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" ADD "method" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "request"`);
        await queryRunner.query(`ALTER TABLE "logs" ADD "request" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "response"`);
        await queryRunner.query(`ALTER TABLE "logs" ADD "response" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "response"`);
        await queryRunner.query(`ALTER TABLE "logs" ADD "response" json NOT NULL`);
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "request"`);
        await queryRunner.query(`ALTER TABLE "logs" ADD "request" json NOT NULL`);
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "method"`);
    }

}
