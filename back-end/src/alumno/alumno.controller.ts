import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CreateAlumnoDto } from './dto/crear-alumno.dto';
import { AlumnoService } from './alumno.service';
import { ApiKeyGuard } from 'src/auth/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class AlumnoController {
    constructor(private readonly alumnoService: AlumnoService) { }

    @Get('consultar-alumno/:idGrado')
    async consultarAlumno(@Param('idGrado', ParseIntPipe) idGrado: number) {
        return this.alumnoService.obtenerAlumnoPorGrado(idGrado);
    }

    @Post('crear-alumno')
    async crearAlumno(@Body() data: CreateAlumnoDto) {
        return this.alumnoService.crearAlumno(data);
    }
}
