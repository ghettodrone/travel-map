import { Module } from '@nestjs/common';
import { TripsController } from './trips.controller.js';
import { TripsService } from './trips.service.js';
import { VisitsModule } from '../visits/visits.module.js';

@Module({
  imports: [VisitsModule],
  controllers: [TripsController],
  providers: [TripsService]
})
export class TripsModule {}
