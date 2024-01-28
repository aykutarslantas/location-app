import { Controller, Post, Body } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationDto } from './dto/location.dto';

@Controller('locations')
export class RouteController {
    constructor(private readonly locationService: LocationService) { }

    @Post('routes')
    async findClosestLocations(@Body() locationDto: LocationDto): Promise<any[]> {
        
        const { latitude, longitude } = locationDto;

        const closestLocations = await this.locationService.findClosestLocations(latitude, longitude);

        return closestLocations;
    }
}
