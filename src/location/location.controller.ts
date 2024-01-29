import { Controller, Get, Post, Param, Body, Put, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from './location.model';
import { LocationDto } from './dto/location.dto';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() locationDto: LocationDto): Promise<Location> {
    return this.locationService.create(locationDto);
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
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: string, @Body() updateLocationDto: LocationDto): Promise<Location> {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Location> {
    return this.locationService.remove(id);
  }


  @Post('routes')
  async findClosestLocations(@Body() locationDto: LocationDto): Promise<any[]> {
      
      const { latitude, longitude } = locationDto;

      const closestLocations = await this.locationService.findClosestLocations(latitude, longitude);

      return closestLocations;
  }

}
