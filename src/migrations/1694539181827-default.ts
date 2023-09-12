import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1694539181827 implements MigrationInterface {
    name = 'Default1694539181827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" ADD "quantidade" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "quantidade"`);
    }

}
