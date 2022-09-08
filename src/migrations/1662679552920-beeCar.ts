import { MigrationInterface, QueryRunner } from "typeorm";

export class beeCar1662679552920 implements MigrationInterface {
    name = 'beeCar1662679552920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rent" DROP COLUMN "finalHour"`);
        await queryRunner.query(`ALTER TABLE "rent" ADD "finalHour" TIME NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rent" DROP COLUMN "finalHour"`);
        await queryRunner.query(`ALTER TABLE "rent" ADD "finalHour" date NOT NULL`);
    }

}
