import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseCrudService } from '../common/services/base-crud.service.js';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTripDto } from './dto/create-trip.dto.js';
import { UpdateTripDto } from './dto/update-trip.dto.js';

@Injectable()
export class TripsService extends BaseCrudService{
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(createTripDto: CreateTripDto, userId: string) {
    const { title, description, startDate, endDate } = createTripDto;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      throw new BadRequestException(
        'End date must be after start date',
      );
    }

    const trip = await this.prisma.trip.create({
      data: {
        title,
        description,
        startDate: start,
        endDate: end,
        userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        startDate: true,
        endDate: true,
        status: true,
        createdAt: true,
      },
    });

    return trip;
  }

  async update(
    id: string,
    userId: string,
    updateTripDto: UpdateTripDto,
    ) {
    const existingTrip = await this.findOrThrow(
        () =>
        this.prisma.trip.findFirst({
            where: {
            id,
            userId,
            },
        }),
        'Trip not found',
    );

  const startDate = updateTripDto.startDate
    ? new Date(updateTripDto.startDate)
    : existingTrip.startDate;

  const endDate = updateTripDto.endDate
    ? new Date(updateTripDto.endDate)
    : existingTrip.endDate;

    if (endDate <= startDate) {
        throw new BadRequestException(
        'End date must be after start date',
        );
    }

    return this.prisma.trip.update({
        where: {
        id,
        },
        data: {
        ...updateTripDto,
        startDate,
        endDate,
        },
        select: {
        id: true,
        title: true,
        description: true,
        startDate: true,
        endDate: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        },
    });
    }

    async delete(id: string, userId: string) {
        await this.findOrThrow(
        () =>
            this.prisma.trip.findFirst({
            where: {
                id,
                userId,
            },
            }),
        'Trip not found',
        );

        await this.prisma.trip.delete({
            where: {
            id,
            },
        });

        return {
            message: 'Trip deleted successfully',
        };
    }

    async findAll(userId: string) {
        return this.executeFindAll(() =>
            this.prisma.trip.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                title: true,
                description: true,
                startDate: true,
                endDate: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
            }),
        );
    }

    async findOne(id: string, userId: string) {
        return this.findOrThrow(
            () =>
            this.prisma.trip.findFirst({
                where: {
                id,
                userId,
                },
                select: {
                id: true,
                title: true,
                description: true,
                startDate: true,
                endDate: true,
                status: true,
                createdAt: true,
                },
            }),
            'Trip not found',
        );
    }
}