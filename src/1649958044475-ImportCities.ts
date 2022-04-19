import { readFileSync } from 'fs';
import { City } from 'src/city/entities/city.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as allCities from 'data/codes-postaux.json';
import { AppDataSource } from 'src/modules/db/ormconfig';
// Error during migration using CLI
// https://github.com/typeorm/typeorm/issues/8885
export class ImportCities1649958044475 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = AppDataSource.manager;

    const repository = manager.getRepository(City);
    await repository.save(
      allCities['default'].map((rawCity) => {
        const city = new City();
        city.postCode = rawCity.codePostal;
        city.communeCode = rawCity.codeCommune;
        city.communeLabel = rawCity.nomCommune;
        city.name = rawCity.libelleAcheminement;
        return city;
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const manager = AppDataSource.manager;

    const repository = manager.getRepository(City);
    repository.clear();
  }
}
