import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1694655638776 implements MigrationInterface {
    name = 'Default1694655638776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notas_fiscais" ("id" SERIAL NOT NULL, "produto_id" integer, "cliente_id" integer, CONSTRAINT "PK_c7dcf62527c4f388d8494aa5f55" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notas_fiscais" ADD CONSTRAINT "FK_9b1a26a69dd3f08e435a2982249" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notas_fiscais" ADD CONSTRAINT "FK_51af6f6c3053e94f6e2fe323114" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notas_fiscais" DROP CONSTRAINT "FK_51af6f6c3053e94f6e2fe323114"`);
        await queryRunner.query(`ALTER TABLE "notas_fiscais" DROP CONSTRAINT "FK_9b1a26a69dd3f08e435a2982249"`);
        await queryRunner.query(`DROP TABLE "notas_fiscais"`);
    }

}
