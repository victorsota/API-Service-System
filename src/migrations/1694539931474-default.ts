import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1694539931474 implements MigrationInterface {
    name = 'Default1694539931474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clientes" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_d76bf3571d906e4e86470482c08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vendas" ("produto_id" integer NOT NULL, "cliente_id" integer NOT NULL, CONSTRAINT "PK_6ae4a5a12afea461d5bc9165eeb" PRIMARY KEY ("produto_id", "cliente_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_06762185d76f77d2cc39d377cf" ON "vendas" ("produto_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_48b446b478c4b5447d82ae34e3" ON "vendas" ("cliente_id") `);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "clientesId" integer`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD CONSTRAINT "FK_a18bb644f2b7cbe13693184eb16" FOREIGN KEY ("clientesId") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD CONSTRAINT "FK_06762185d76f77d2cc39d377cf4" FOREIGN KEY ("produto_id") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD CONSTRAINT "FK_48b446b478c4b5447d82ae34e36" FOREIGN KEY ("cliente_id") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendas" DROP CONSTRAINT "FK_48b446b478c4b5447d82ae34e36"`);
        await queryRunner.query(`ALTER TABLE "vendas" DROP CONSTRAINT "FK_06762185d76f77d2cc39d377cf4"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP CONSTRAINT "FK_a18bb644f2b7cbe13693184eb16"`);
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "clientesId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_48b446b478c4b5447d82ae34e3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_06762185d76f77d2cc39d377cf"`);
        await queryRunner.query(`DROP TABLE "vendas"`);
        await queryRunner.query(`DROP TABLE "clientes"`);
    }

}
