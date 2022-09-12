import { MigrationInterface, QueryRunner } from "typeorm";

export class beeCar1662991559469 implements MigrationInterface {
    name = 'beeCar1662991559469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "img" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "img" SET NOT NULL`);
    }

}
