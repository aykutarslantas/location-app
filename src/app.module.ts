import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationModule } from './location/location.module';
import { RouteController } from './location/route.controller';
import { LocationController } from './location/location.controller';
import { LocationService } from './location/location.service';
import { Location, LocationSchema } from './location/location.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/location'),
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }]),
    LocationModule,
  ],
  controllers: [LocationController, RouteController],
  providers: [LocationService],
})
export class AppModule { }
