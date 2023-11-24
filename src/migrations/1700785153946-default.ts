import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1700785153946 implements MigrationInterface {
    name = 'Default1700785153946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "services" ("id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "bairro" character varying(255) NOT NULL, "cidade" character varying(255) NOT NULL, "estado" character varying(255) NOT NULL, "rua" character varying(255) NOT NULL, "numero" character varying(10) NOT NULL, "complemento" character varying(255), "status" boolean NOT NULL DEFAULT true, "userId" integer, CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_3905389899d96c4f1b3619f68d5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_3905389899d96c4f1b3619f68d5"`);
        await queryRunner.query(`DROP TABLE "services"`);
    }

}
