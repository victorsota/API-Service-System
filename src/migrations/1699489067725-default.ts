import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1699489067725 implements MigrationInterface {
    name = 'Default1699489067725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "message"`);
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "level"`);
        await queryRunner.query(`ALTER TABLE "logs" ADD "path" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "logs" ADD "params" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "logs" ADD "request" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "logs" ADD "response" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "response"`);
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "request"`);
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "params"`);
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "path"`);
        await queryRunner.query(`ALTER TABLE "logs" ADD "level" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "logs" ADD "message" character varying NOT NULL`);
    }

}
