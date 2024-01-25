import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = Location & Document;

@Schema()
export class Location {
  @Prop()
  name: string;

  @Prop()
  marker: string;

  @Prop()
  latitude: number;

  @Prop()
  longitude: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
