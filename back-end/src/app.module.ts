import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AlumnoModule } from './alumno/alumno.module';

@Global()
@Module({
  imports: [PrismaModule, AlumnoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
