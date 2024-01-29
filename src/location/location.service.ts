import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationDocument } from './location.model';


interface LocationDistance {
  name: string;
  distance: number;
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

    if (result.deletedCount === 1) {
      return this.locationModel.findById(id).exec();
    } else {
      throw new NotFoundException('Location not found or could not be deleted');
    }
  }

  async findClosestLocations(latitude: number, longitude: number): Promise<LocationDistance[]> {
    const allLocations = await this.locationModel.find().exec();

    const sortedLocations = allLocations.sort((a, b) => {
      const distanceToA = this.calculateDistance(latitude, longitude, a.latitude, a.longitude);
      const distanceToB = this.calculateDistance(latitude, longitude, b.latitude, b.longitude);
      return distanceToA - distanceToB;
    });

    return sortedLocations.map(location => ({
      name: location.name,
      distance: this.calculateDistance(latitude, longitude, location.latitude, location.longitude)
    }));
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // haversine-fonksiyonu
    const R = 6371;

    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
