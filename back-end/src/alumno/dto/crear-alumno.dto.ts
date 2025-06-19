import { IsDateString, IsInt, IsString } from "class-validator";


export class CreateAlumnoDto {
  @IsString()
  Nombre: string;

  @IsDateString()
  FechaNacimiento: Date;

  @IsString()
  NombrePadre: string;

  @IsString()
  NombreMadre: string;

  @IsInt()
  IdGrado: number;

  @IsString()
  Seccion: string;

  @IsDateString()
  FechaIngreso: Date;
}
