import { Controller, Post, Body } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('locations')
export class RouteController {
    constructor(private readonly locationService: LocationService) { }

    @Post('routes')
    async findClosestLocations(@Body() requestBody: { latitude: number, longitude: number }): Promise<any[]> {
        const { latitude, longitude } = requestBody;

        const closestLocations = await this.locationService.findClosestLocations(latitude, longitude);

        return closestLocations;
    }
}
