import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards, Patch, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { TripsService } from './trips.service.js';
import { CreateTripDto } from './dto/create-trip.dto.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import type { AuthUser } from '../auth/interfaces/auth-user.interface.js';
import { UpdateTripDto } from './dto/update-trip.dto.js';

@Controller('trips')
@UseGuards(JwtAuthGuard)
export class TripsController {
    constructor(private readonly tripsService: TripsService){

    }

    @Post()
    create(
        @Body() createTripDto: CreateTripDto,
        @CurrentUser() user: AuthUser,
    ) {
        return this.tripsService.create(createTripDto, user.userId);
    }

    @Get()
    findAll(@CurrentUser() user: AuthUser) {
        return this.tripsService.findAll(user.userId);
    }

    @Get(':id')
    findOne(
        @Param('id', new ParseUUIDPipe()) id: string,
        @CurrentUser() user: AuthUser,
    ) {
        return this.tripsService.findOne(id, user.userId);
    }

    @Patch(':id')
    update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTripDto: UpdateTripDto,
    @CurrentUser() user: AuthUser,
    ) {
        return this.tripsService.update(
            id,
            user.userId,
            updateTripDto,
        );
    }

    @Delete(':id')
    remove(
    @Param('id', new ParseUUIDPipe()) id: string,
    @CurrentUser() user: AuthUser,
    ) {
    return this.tripsService.delete(id, user.userId);
    }
}
