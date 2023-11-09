import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1699498613535 implements MigrationInterface {
    name = 'Default1699498613535'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "denuncias" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "cep" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_66f89a94d837d2ca501b8bd9456" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "denuncias"`);
    }

}
