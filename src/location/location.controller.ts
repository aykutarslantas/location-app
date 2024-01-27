import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from './location.model';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  @Post()
  create(@Body() location: Location): Promise<Location> {
    return this.locationService.create(location);
  }

  @Get()
  findAll(): Promise<Location[]> {
    return this.locationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Location> {
    return this.locationService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() location: Location): Promise<Location> {
    return this.locationService.update(id, location);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Location> {
    const result = await this.locationService.remove(id);
    return result;
  }
}
