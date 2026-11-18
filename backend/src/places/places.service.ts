import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { BaseCrudService } from '../common/services/base-crud.service.js';
import { CreatePlaceDto } from './dto/create-place.dto.js';

@Injectable()
export class PlacesService extends BaseCrudService {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(createPlaceDto: CreatePlaceDto, userId: string) {
    const { name, description, latitude, longitude, category } =
      createPlaceDto;

    return this.prisma.place.create({
      data: {
        name,
        description,
        latitude,
        longitude,
        category,
        userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        latitude: true,
        longitude: true,
        category: true,
        createdAt: true,
      },
    });
  }
}