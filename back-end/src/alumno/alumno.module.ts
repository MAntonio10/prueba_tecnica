import { Module } from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { AlumnoController } from './alumno.controller';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [ConfigModule],
  providers: [AlumnoService, ApiKeyGuard, PrismaService],
  controllers: [AlumnoController]
})
export class AlumnoModule { }