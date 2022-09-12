import { MigrationInterface, QueryRunner } from "typeorm";

export class beecar1663015413450 implements MigrationInterface {
    name = 'beecar1663015413450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "district" character varying(50) NOT NULL, "zipCode" character varying(8) NOT NULL, "number" character varying(5) NOT NULL, "city" character varying(50) NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cnh" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying(2) NOT NULL, "number" character varying(50) NOT NULL, "validate" date NOT NULL, CONSTRAINT "UQ_b70b8d37b9298c669e8196c61c4" UNIQUE ("number"), CONSTRAINT "PK_7a69fcbea72a563d96bd33fef45" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "automatic" boolean NOT NULL DEFAULT false, "type" character varying(20) NOT NULL, "airConditioning" boolean NOT NULL DEFAULT true, "directionType" character varying(50) NOT NULL, "powerWindows" boolean NOT NULL, "pricePerDay" numeric(12,2) NOT NULL, "pricePerMouth" numeric(12,2) NOT NULL, "pricePeryear" numeric(12,2) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "licensePlate" character varying(7) NOT NULL, "color" character varying(50) NOT NULL, "model" character varying(50) NOT NULL, "fuel" character varying(1) NOT NULL, "year" integer NOT NULL, "brand" character varying(50) NOT NULL, "rented" boolean NOT NULL DEFAULT false, "document" boolean NOT NULL DEFAULT true, "isActive" boolean NOT NULL DEFAULT true, "price" numeric(12,2) NOT NULL, "km" numeric(12,2) NOT NULL, "hp" integer NOT NULL, "maintenence" boolean NOT NULL DEFAULT false, "img" character varying, "categoriesId" uuid, CONSTRAINT "UQ_1df40c87717e8631a39fd42920a" UNIQUE ("licensePlate"), CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rent" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "initialDate" date NOT NULL, "initialHour" TIME NOT NULL, "finalDate" date NOT NULL, "finalHour" TIME NOT NULL, "totalValue" numeric(12,2) NOT NULL, "usersId" uuid, "carsId" uuid, CONSTRAINT "PK_211f726fd8264e82ff7a2b86ce2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "birthDate" date NOT NULL, "cpf" character varying(11) NOT NULL, "age" integer NOT NULL, "email" character varying(50) NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "cnhId" uuid, "addressId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_84cdcf05ce244ce7797bd7e65f" UNIQUE ("cnhId"), CONSTRAINT "REL_bafb08f60d7857f4670c172a6e" UNIQUE ("addressId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cardNumber" character varying(50) NOT NULL, "validate" date NOT NULL, "name" character varying(50) NOT NULL, "userId" uuid, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_82825381114519b3af0893e218a" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rent" ADD CONSTRAINT "FK_7e2ad084245f763998b93a6cd3e" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rent" ADD CONSTRAINT "FK_987a4bb4c078eda24eeb5a2879d" FOREIGN KEY ("carsId") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_84cdcf05ce244ce7797bd7e65f3" FOREIGN KEY ("cnhId") REFERENCES "cnh"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_7b7230897ecdeb7d6b0576d907b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_7b7230897ecdeb7d6b0576d907b"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bafb08f60d7857f4670c172a6ea"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_84cdcf05ce244ce7797bd7e65f3"`);
        await queryRunner.query(`ALTER TABLE "rent" DROP CONSTRAINT "FK_987a4bb4c078eda24eeb5a2879d"`);
        await queryRunner.query(`ALTER TABLE "rent" DROP CONSTRAINT "FK_7e2ad084245f763998b93a6cd3e"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_82825381114519b3af0893e218a"`);
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "rent"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "cnh"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
