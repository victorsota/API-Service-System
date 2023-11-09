import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1699492109578 implements MigrationInterface {
    name = 'Default1699492109578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "status"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" ADD "status" character varying NOT NULL`);
    }

}
