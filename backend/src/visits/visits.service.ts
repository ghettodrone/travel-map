import { Injectable, NotFoundException, BadRequestException, } from '@nestjs/common';
import { BaseCrudService } from '../common/services/base-crud.service.js';
import { CreateVisitDto } from './dto/create-visit.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class VisitsService extends BaseCrudService{
    constructor(protected readonly prisma: PrismaService){
        super();
    }

    async create(createVisitDto: CreateVisitDto, userId: string){
        const {placeId, tripId, visitedAt, notes} = createVisitDto;

        const place = await this.prisma.place.findFirst({
            where: {
                id: placeId,
                userId
            }
        })

        if(!place){
            throw new NotFoundException('Place not found');
        }

        const trip = await this.prisma.trip.findFirst({
            where: {
                id: tripId,
                userId
            }
        })

        if(!trip){
            throw new NotFoundException('Place not found');
        }

        const visitDate = visitedAt
        ? new Date(visitedAt)
        : new Date();

        const tripStartDate = new Date(trip.startDate);
        tripStartDate.setUTCHours(0, 0, 0, 0);

        const tripEndDate = new Date(trip.endDate);
        tripEndDate.setUTCHours(23, 59, 59, 999);

        if (
            visitDate < tripStartDate ||
            visitDate > tripEndDate
        ) {
            throw new BadRequestException(
                'Visit date must be within the trip dates',
            );
        }

        return this.prisma.visit.create({
            data: {
                placeId,
                tripId,
                visitedAt: visitDate,
                notes,
            },
            select: {
                id: true,
                placeId: true,
                tripId: true,
                visitedAt: true,
                notes: true,
            }
        });
    }

    async findAll(userId: string) {
        return this.prisma.visit.findMany({
            where: {
            trip: {
                userId,
            },
            },
            orderBy: {
            visitedAt: 'desc',
            },
            select: {
            id: true,
            visitedAt: true,
            notes: true,
            place: {
                select: {
                id: true,
                name: true,
                latitude: true,
                longitude: true,
                category: true,
                },
            },
            trip: {
                select: {
                id: true,
                title: true,
                },
            },
            },
        });
    }

    findByTrip(tripId: string,userId: string){
        return this.prisma.visit.findMany({
            where: {
                tripId,
                trip: {
                    userId,
                },
            },
            orderBy: {
                visitedAt: 'asc',
            },
            select: {
                id: true,
                visitedAt: true,
                notes: true,
                place: {
                    select: {
                    id: true,
                    name: true,
                    latitude: true,
                    longitude: true,
                    category: true,
                    },
                },
            },
        })
    }
}
