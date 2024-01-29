import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationDocument } from './location.model';
import { GeoHelper } from '../helpers/geo.helper';


interface LocationDistance {
  name: string;
  distance: number;
  latitude: number;
  longitude: number;
}

@Injectable()
export class LocationService {
  constructor(@InjectModel(Location.name) private readonly locationModel: Model<LocationDocument>) { }

  async create(location: Location): Promise<Location> {
    const createdLocation = new this.locationModel(location);
    return createdLocation.save();
  }

  async findAll(): Promise<Location[]> {
    return this.locationModel.find().exec();
  }

  async findOne(id: string): Promise<Location> {
    return this.locationModel.findById(id).exec();
  }

  async update(id: string, location: Location): Promise<Location> {
    return this.locationModel.findByIdAndUpdate(id, location, { new: true }).exec();
  }

  async remove(id: string): Promise<Location> {
    const result = await this.locationModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount) return this.locationModel.findById(id).exec();

    throw new NotFoundException('Location not found or could not be deleted');
  }

  async findClosestLocations(latitude: number, longitude: number): Promise<LocationDistance[]> {

    const allLocations = await this.locationModel.find().exec();
    let currentLatitude = latitude;
    let currentLongitude = longitude;
    const visitedLocations = new Set<string>();
    const route: LocationDistance[] = [];

    while (route.length < allLocations.length) {
      const closest = this.findClosestUnvisitedLocation(currentLatitude, currentLongitude, allLocations, visitedLocations);
      if (!closest) {
        break;
      }

      route.push(closest);
      visitedLocations.add(closest.name);
      currentLatitude = closest.latitude;
      currentLongitude = closest.longitude;
    }

    return route;

  }

  private findClosestUnvisitedLocation(currentLatitude: number, currentLongitude: number, locations: LocationDocument[], visitedLocations: Set<string>): LocationDistance | null {
    let closestDistance = Number.MAX_VALUE;
    let closestLocation: LocationDistance | null = null;

    for (const location of locations) {
      if (!visitedLocations.has(location._id.toString())) {
        const distance = GeoHelper.calculateDistance(currentLatitude, currentLongitude, location.latitude, location.longitude);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestLocation = {
            name: location.name,
            distance: distance,
            latitude: location.latitude,
            longitude: location.longitude
          };
        }
      }
    }

    return closestLocation;
  }
}
