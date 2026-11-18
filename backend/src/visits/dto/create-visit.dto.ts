import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateVisitDto {
    @IsUUID()
    @IsNotEmpty()
    placeId: string;

    @IsUUID()
    @IsNotEmpty()
    tripId: string;

    @IsOptional()
    @IsDateString()
    visitedAt?: string;

    @IsOptional()
    @IsString()
    @MaxLength(2000)
    notes?: string;
}