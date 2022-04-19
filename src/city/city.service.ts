import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';
import * as allCities from 'data/codes-postaux.json';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City) private cityRepository: Repository<City>,
  ) {}

  create(createCityDto: CreateCityDto) {
    return 'This action adds a new city';
  }

  findMatch(@Param() keyword: string): Promise<City[]> {
    return this.cityRepository.find({
      where: [
        {
          name: Like(`%${keyword.toUpperCase()}%`),
        },
        {
          postCode: Like(`%${keyword}%`),
        },
      ],
      take: 100,
      order: { name: 'ASC' },
    });
  }

  findAll(): Promise<City[]> {
    return this.cityRepository.find({ take: 100 });
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }

  async import() {
    // Only save by chunk, otherwise could reach postgres limit of 65335 parameters
    await this.cityRepository.save(
      allCities['default'].map((rawCity) => {
        const city = new City();
        city.postCode = rawCity.codePostal;
        city.communeCode = rawCity.codeCommune;
        city.communeLabel = rawCity.nomCommune;
        city.name = rawCity.libelleAcheminement;
        city.isMetropolitan = !(
          rawCity.codePostal.substring(0, 2) === '97' ||
          rawCity.codePostal.substring(0, 2) === '98'
        );
        return city;
      }),
      { chunk: 50 },
    );
  }
}
