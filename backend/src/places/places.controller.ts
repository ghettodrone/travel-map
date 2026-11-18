import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  UseGuards,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';


import { PlacesService } from './places.service.js';
import { CreatePlaceDto } from './dto/create-place.dto.js';
import { UpdatePlaceDto } from './dto/update-place.dto.js';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import type { AuthUser } from '../auth/interfaces/auth-user.interface.js';

@Controller('places')
@UseGuards(JwtAuthGuard)
export class PlacesController {
    constructor(private readonly placesService: PlacesService) {}

    @Post()
    create(
        @Body() createPlaceDto: CreatePlaceDto,
        @CurrentUser() user: AuthUser,
    ) {
        return this.placesService.create(createPlaceDto, user.userId);
    }

    @Get()
    findAll(@CurrentUser() user: AuthUser) {
        return this.placesService.findAll(user.userId);
    }

    @Get(':id')
    findOne(
        @Param('id', new ParseUUIDPipe()) id: string,
        @CurrentUser() user: AuthUser,
        ) {
        return this.placesService.findOne(id, user.userId);
    }

    @Patch(':id')
    update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updatePlaceDto: UpdatePlaceDto,
        @CurrentUser() user: AuthUser,
        ) {
        return this.placesService.update(
            id,
            user.userId,
            updatePlaceDto,
        );
    }
}
