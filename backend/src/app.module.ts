import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module.js';
import { HealthModule } from './health/health.module.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { TripsModule } from './trips/trips.module.js';
import { PlacesModule } from './places/places.module.js';
import { VisitsModule } from './visits/visits.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    HealthModule,
    UsersModule,
    AuthModule,
    TripsModule,
    PlacesModule,
    VisitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
