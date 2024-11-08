import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731087368530 implements MigrationInterface {
    name = 'Migration1731087368530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Movie" DROP COLUMN "externalRating"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Movie" ADD "externalRating" double precision`);
    }

}
