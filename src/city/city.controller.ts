import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  search(@Query('search') keyword: string) {
    if (keyword) return this.cityService.findMatch(keyword);
    return this.cityService.findAll();
  }

  @Get('/import')
  async import() {
    await this.cityService.import();
    return 'Done';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(+id);
  }
}
