import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationDocument } from './location.model';

@Injectable()
export class LocationService {
  constructor(@InjectModel(Location.name) private readonly locationModel: Model<LocationDocument>) {}

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
}
