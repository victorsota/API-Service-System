import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1694655909509 implements MigrationInterface {
    name = 'Default1694655909509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vendas" ("id" SERIAL NOT NULL, "produto_id" integer, "cliente_id" integer, CONSTRAINT "PK_371c42d415efbac7097bd08b744" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD CONSTRAINT "FK_06762185d76f77d2cc39d377cf4" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vendas" ADD CONSTRAINT "FK_48b446b478c4b5447d82ae34e36" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vendas" DROP CONSTRAINT "FK_48b446b478c4b5447d82ae34e36"`);
        await queryRunner.query(`ALTER TABLE "vendas" DROP CONSTRAINT "FK_06762185d76f77d2cc39d377cf4"`);
        await queryRunner.query(`DROP TABLE "vendas"`);
    }

}
