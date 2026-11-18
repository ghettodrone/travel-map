import {
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

import { PlaceCategory } from '../../generated/prisma/client.js';
import { Type } from 'class-transformer';

export class CreatePlaceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @Type(() => Number)
  @Min(-90)
  @Max(90)
  @IsLatitude()
  latitude: number;

  @Type(() => Number)
  @Min(-180)
  @Max(180)
  @IsLongitude()
  longitude: number;

  @IsEnum(PlaceCategory)
  category: PlaceCategory;
}