import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsMetropolitan1649971663433 implements MigrationInterface {
    name = 'AddIsMetropolitan1649971663433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "city" ("id" SERIAL NOT NULL, "postCode" character varying NOT NULL, "communeCode" character varying NOT NULL, "communeLabel" character varying NOT NULL, "name" character varying NOT NULL, "isMetropolitan" boolean NOT NULL, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "city"`);
    }

}
