import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { CreateVisitDto } from './dto/create-visit.dto.js';
import type { AuthUser } from '../auth/interfaces/auth-user.interface.js';
import { VisitsService } from './visits.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('visits')
@UseGuards(JwtAuthGuard)
export class VisitsController {
    constructor(private readonly visitService: VisitsService){}
    @Post()
    create(
        @Body() createVisitDto: CreateVisitDto,
        @CurrentUser() user: AuthUser,
    ) {
        return this.visitService.create(createVisitDto, user.userId);
    }

    @Get()
    findAll(@CurrentUser() user: AuthUser) {
        return this.visitService.findAll(user.userId);
    }
}
