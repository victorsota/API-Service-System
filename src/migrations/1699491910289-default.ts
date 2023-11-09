import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1699491910289 implements MigrationInterface {
    name = 'Default1699491910289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" RENAME COLUMN "statusCode" TO "status"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" RENAME COLUMN "status" TO "statusCode"`);
    }

}
