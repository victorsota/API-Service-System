import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1694489370751 implements MigrationInterface {
    name = 'Default1694489370751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tipos_produtos" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, CONSTRAINT "PK_7d72717682777deeb6a96e15228" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "produtos" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "preco" integer NOT NULL, "tipo_id" integer, CONSTRAINT "PK_a5d976312809192261ed96174f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_ff008aca54cdbfccdede506efb3" FOREIGN KEY ("tipo_id") REFERENCES "tipos_produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_ff008aca54cdbfccdede506efb3"`);
        await queryRunner.query(`DROP TABLE "produtos"`);
        await queryRunner.query(`DROP TABLE "tipos_produtos"`);
    }

}
