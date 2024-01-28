import { IsString, IsNumber, Length, Min, Max, IsHexadecimal } from 'class-validator';

export class LocationDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @IsString()
  @IsHexadecimal()
  marker: string;
}
