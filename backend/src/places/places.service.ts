import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { BaseCrudService } from '../common/services/base-crud.service.js';
import { CreatePlaceDto } from './dto/create-place.dto.js';
import { UpdatePlaceDto } from './dto/update-place.dto.js';

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

    async findAll(userId: string) {
        return this.prisma.place.findMany({
            where: {
                userId,
                },
                orderBy: {
                createdAt: 'desc',
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

    async findOne(id: string, userId: string) {
        return this.findOrThrow(
            () =>
            this.prisma.place.findFirst({
                where: {
                id,
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
                updatedAt: true,
                },
        }),
        'Place not found',
    );
    }

    async update(
        id: string,
        userId: string,
        updatePlaceDto: UpdatePlaceDto,
    ) {
        await this.findOrThrow(
            () =>
            this.prisma.place.findFirst({
                where: {
                id,
                userId,
                },
            }),
            'Place not found',
        );

        return this.prisma.place.update({
            where: {
            id,
            },
            data: updatePlaceDto,
            select: {
            id: true,
            name: true,
            description: true,
            latitude: true,
            longitude: true,
            category: true,
            createdAt: true,
            updatedAt: true,
            },
        });
    }
}