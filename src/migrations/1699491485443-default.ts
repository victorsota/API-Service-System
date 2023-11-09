import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1699491485443 implements MigrationInterface {
    name = 'Default1699491485443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" ADD "statusCode" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "statusCode"`);
    }

}
