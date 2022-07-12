import {MigrationInterface, QueryRunner} from "typeorm";

export class fixUsers1657651883180 implements MigrationInterface {
    name = 'fixUsers1657651883180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "FK_6c444ce6637f2c1d71c3cf136c1"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(20) NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customer_id" integer, CONSTRAINT "REL_c7bc1ffb56c570f42053fa7503" UNIQUE ("customer_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "update_at"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "UQ_6c444ce6637f2c1d71c3cf136c1"`);
        await queryRunner.query(`ALTER TABLE "customers" DROP COLUMN "customer_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c7bc1ffb56c570f42053fa7503b" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c7bc1ffb56c570f42053fa7503b"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "customer_id" integer`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "UQ_6c444ce6637f2c1d71c3cf136c1" UNIQUE ("customer_id")`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "role" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "password" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customers" ADD "email" character varying(50) NOT NULL`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "FK_6c444ce6637f2c1d71c3cf136c1" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
