import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationModule } from './location/location.module';
import { LocationController } from './location/location.controller';
import { LocationService } from './location/location.service';
import { Location, LocationSchema } from './location/location.model';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import * as mongoose from 'mongoose';

mongoose.set('debug', true);
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }]),
    LocationModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }])
  ],
  controllers: [LocationController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    LocationService,
  ],
})
export class AppModule { }