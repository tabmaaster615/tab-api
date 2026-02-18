import { MigrationInterface, QueryRunner } from "typeorm";

export class InitRBAC1771443626997 implements MigrationInterface {
    name = 'InitRBAC1771443626997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tournament_roles" DROP CONSTRAINT "UQ_b01ed41badec5ccac1a88989a03"`);
        await queryRunner.query(`ALTER TABLE "user_tournament_roles" ADD "tournament_id" character varying`);
        await queryRunner.query(`ALTER TABLE "user_tournament_roles" ADD CONSTRAINT "UQ_57d4b3624536f57af886b449881" UNIQUE ("userId", "roleId", "tournament_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tournament_roles" DROP CONSTRAINT "UQ_57d4b3624536f57af886b449881"`);
        await queryRunner.query(`ALTER TABLE "user_tournament_roles" DROP COLUMN "tournament_id"`);
        await queryRunner.query(`ALTER TABLE "user_tournament_roles" ADD CONSTRAINT "UQ_b01ed41badec5ccac1a88989a03" UNIQUE ("roleId", "userId")`);
    }

}
