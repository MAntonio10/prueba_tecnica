import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlumnoDto } from './dto/crear-alumno.dto';

@Injectable()
export class AlumnoService {
    constructor(private prisma: PrismaService) { }

    async obtenerAlumnoPorGrado(idGrado: number) {
        try {
            const alumnos = await this.prisma.alumno.findMany({
                where: {
                    IdGrado: idGrado
                },
                include: {
                    Grado: true,
                }
            })
            if (!alumnos) {
                throw new BadRequestException('No se encontraron alumnos para el grado especificado');
            }
            return alumnos;
        } catch (error) {
            console.error('Error al obtener alumnos por grado:', error);
            throw new InternalServerErrorException('No se pudieron obtener los alumnos por grado');
        }
    }

    async crearAlumno(data: CreateAlumnoDto) {
        try {
            const alumnos = await this.prisma.alumno.create({
                data: {
                    ...data,
                    FechaNacimiento: new Date(data.FechaNacimiento),
                    FechaIngreso: new Date(data.FechaIngreso),
                }
            })
            if (!data.FechaIngreso || !data.FechaNacimiento || !data.Nombre || !data.NombrePadre || !data.NombreMadre || !data.IdGrado || !data.Seccion) {
                throw new BadRequestException('Los datos del alumno son inválidos o no se proporcionaron correctamente');
            }
            return { message: 'Alumno creado exitosamente' };
        } catch (error) {
            console.error('Error al crear alumno:', error);
            throw new InternalServerErrorException('No se pudo crear el alumno');
        }
    }
}
