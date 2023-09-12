import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1694490601672 implements MigrationInterface {
    name = 'Default1694490601672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" ADD "descricao" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "descricao"`);
    }

}
