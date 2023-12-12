import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1702347400226 implements MigrationInterface {
    name = 'Default1702347400226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "activities" ("id" SERIAL NOT NULL, "nome" character varying(255) NOT NULL, "custo" double precision NOT NULL, "serviceId" integer, CONSTRAINT "PK_7f4004429f731ffb9c88eb486a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_8ef4021ab8529f137b9172d11c1" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_8ef4021ab8529f137b9172d11c1"`);
        await queryRunner.query(`DROP TABLE "activities"`);
    }

}
