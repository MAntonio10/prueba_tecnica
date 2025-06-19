import { Component, Injectable, OnInit, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


interface Alumno {
  Id?: number;
  Nombre: string;
  FechaNacimiento: string;
  NombrePadre: string;
  NombreMadre: string;
  IdGrado: number;
  Seccion: string;
  FechaIngreso: string;
  Grado?: {
    Id: number;
    Nombre: string;
  };
}

interface AlumnoFormData {
  Nombre: string;
  FechaNacimiento: string;
  NombrePadre: string;
  NombreMadre: string;
  IdGrado: number;
  Seccion: string;
  FechaIngreso: string;
}

@Component({
  selector: 'app-root',
  template: `
    <div class="container-fluid py-4">
      <!-- Header -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card header-gradient text-white">
            <div class="card-body text-center py-4">
              <h1 class="card-title mb-0 fw-light">Sistema de Registro de Alumnos</h1>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <!-- Formulario de Registro -->
        <div class="col-lg-6">
          <div class="card card-shadow h-100">
            <div class="card-header bg-white">
              <h2 class="card-title text-primary mb-0">Registrar Nuevo Alumno</h2>
            </div>
            <div class="card-body">
              <form [formGroup]="studentForm" (ngSubmit)="onSubmit()">
                <!-- Nombre del Alumno -->
                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre del Alumno *</label>
                  <input 
                    type="text" 
                    id="nombre" 
                    formControlName="Nombre" 
                    class="form-control"
                    [class.is-invalid]="isFieldInvalid('Nombre')"
                    placeholder="Ingrese el nombre completo"
                  />
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('Nombre')">
                    El nombre del alumno es requerido
                  </div>
                </div>

                <!-- Fecha de Nacimiento -->
                <div class="mb-3">
                  <label for="fechaNacimiento" class="form-label">Fecha de Nacimiento *</label>
                  <input 
                    type="date" 
                    id="fechaNacimiento" 
                    formControlName="FechaNacimiento" 
                    class="form-control"
                    [class.is-invalid]="isFieldInvalid('FechaNacimiento')"
                  />
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('FechaNacimiento')">
                    La fecha de nacimiento es requerida
                  </div>
                </div>

                <!-- Nombre del Padre -->
                <div class="mb-3">
                  <label for="nombrePadre" class="form-label">Nombre del Padre *</label>
                  <input 
                    type="text" 
                    id="nombrePadre" 
                    formControlName="NombrePadre" 
                    class="form-control"
                    [class.is-invalid]="isFieldInvalid('NombrePadre')"
                    placeholder="Ingrese el nombre del padre"
                  />
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('NombrePadre')">
                    El nombre del padre es requerido
                  </div>
                </div>

                <!-- Nombre de la Madre -->
                <div class="mb-3">
                  <label for="nombreMadre" class="form-label">Nombre de la Madre *</label>
                  <input 
                    type="text" 
                    id="nombreMadre" 
                    formControlName="NombreMadre" 
                    class="form-control"
                    [class.is-invalid]="isFieldInvalid('NombreMadre')"
                    placeholder="Ingrese el nombre de la madre"
                  />
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('NombreMadre')">
                    El nombre de la madre es requerido
                  </div>
                </div>

                <!-- Grado y Sección -->
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="grado" class="form-label">Grado *</label>
                    <select 
                      id="grado" 
                      formControlName="IdGrado" 
                      class="form-select"
                      [class.is-invalid]="isFieldInvalid('IdGrado')"
                    >
                      <option value="">Seleccionar Grado</option>
                      <option [value]="1">Primero</option>
                      <option [value]="2">Segundo</option>
                      <option [value]="3">Tercero</option>
                      <option [value]="4">Cuarto</option>
                      <option [value]="5">Quinto</option>
                      <option [value]="6">Sexto</option>
                    </select>
                    <div class="invalid-feedback" *ngIf="isFieldInvalid('IdGrado')">
                      El grado es requerido
                    </div>
                  </div>

                  <div class="col-md-6 mb-3">
                    <label for="seccion" class="form-label">Sección *</label>
                    <select 
                      id="seccion" 
                      formControlName="Seccion" 
                      class="form-select"
                      [class.is-invalid]="isFieldInvalid('Seccion')"
                    >
                      <option value="">Seleccionar Sección</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                    <div class="invalid-feedback" *ngIf="isFieldInvalid('Seccion')">
                      La sección es requerida
                    </div>
                  </div>
                </div>

                <!-- Fecha de Ingreso -->
                <div class="mb-4">
                  <label for="fechaIngreso" class="form-label">Fecha de Ingreso *</label>
                  <input 
                    type="date" 
                    id="fechaIngreso" 
                    formControlName="FechaIngreso" 
                    class="form-control"
                    [class.is-invalid]="isFieldInvalid('FechaIngreso')"
                  />
                  <div class="invalid-feedback" *ngIf="isFieldInvalid('FechaIngreso')">
                    La fecha de ingreso es requerida
                  </div>
                </div>

                <!-- Botones -->
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button type="button" class="btn btn-outline-secondary me-md-2" (click)="resetForm()">
                    <i class="bi bi-arrow-clockwise"></i> Limpiar
                  </button>
                  <button type="submit" class="btn btn-gradient" [disabled]="loading">
                    <span *ngIf="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                    {{ loading ? 'Guardando...' : 'Registrar Alumno' }}
                  </button>
                </div>
              </form>

              <!-- Mensajes de estado -->
              <div class="alert alert-success mt-3" *ngIf="successMessage" role="alert">
                <i class="bi bi-check-circle-fill me-2"></i>{{ successMessage }}
              </div>
              <div class="alert alert-danger mt-3" *ngIf="errorMessage" role="alert">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>{{ errorMessage }}
              </div>
            </div>
          </div>
        </div>

        <!-- Lista de Alumnos -->
        <div class="col-lg-6">
          <div class="card card-shadow h-100">
            <div class="card-header bg-white d-flex justify-content-between align-items-center">
              <h2 class="card-title text-primary mb-0">Lista de Alumnos</h2>
              <span class="badge bg-primary rounded-pill" *ngIf="students.length > 0">
                {{ students.length }} alumno{{ students.length !== 1 ? 's' : '' }}
              </span>
            </div>
            <div class="card-body">
              <!-- Filtro por Grado -->
              <div class="mb-4">
                <label for="gradoFiltro" class="form-label">Filtrar por Grado:</label>
                <select 
                  id="gradoFiltro" 
                  (change)="onGradoChange($event)" 
                  class="form-select"
                  style="max-width: 250px;"
                >
                  <option value="">Todos los grados</option>
                  <option value="1">Primero</option>
                  <option value="2">Segundo</option>
                  <option value="3">Tercero</option>
                  <option value="4">Cuarto</option>
                  <option value="5">Quinto</option>
                  <option value="6">Sexto</option>
                </select>
              </div>

              <!-- Lista de estudiantes -->
              <div class="overflow-auto" style="max-height: 600px;" *ngIf="students.length > 0; else noStudents">
                <div class="mb-3" *ngFor="let student of students">
                  <div class="card student-card">
                    <div class="card-body">
                      <div class="d-flex justify-content-between align-items-start mb-3">
                        <h5 class="card-title mb-0">{{ student.Nombre || 'Sin nombre' }}</h5>
                        <span class="badge grade-badge text-white">
                          {{ student.Grado?.Nombre }} - {{ student.Seccion }}
                        </span>
                      </div>
                      
                      <div class="row g-2">
                        <div class="col-sm-6">
                          <small class="text-muted">Fecha de Nacimiento:</small>
                          <div class="fw-medium">{{ formatDate(student.FechaNacimiento) }}</div>
                        </div>
                        <div class="col-sm-6">
                          <small class="text-muted">Fecha de Ingreso:</small>
                          <div class="fw-medium">{{ formatDate(student.FechaIngreso) }}</div>
                        </div>
                        <div class="col-sm-6">
                          <small class="text-muted">Padre:</small>
                          <div class="fw-medium">{{ student.NombrePadre }}</div>
                        </div>
                        <div class="col-sm-6">
                          <small class="text-muted">Madre:</small>
                          <div class="fw-medium">{{ student.NombreMadre }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ng-template #noStudents>
                <div class="text-center py-5">
                  <div class="mb-3">
                    <i class="bi bi-people display-1 text-muted"></i>
                  </div>
                  <h5 class="text-muted">No hay alumnos registrados</h5>
                  <p class="text-muted mb-0">
                    {{ selectedGrado ? 'No hay alumnos en el grado seleccionado.' : 'Selecciona un grado para ver los alumnos o registra un nuevo alumno.' }}
                  </p>
                </div>
              </ng-template>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true
})
export class App implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  studentForm: FormGroup;
  students: Alumno[] = [];
  loading = false;
  successMessage = '';
  errorMessage = '';
  selectedGrado = '';

  private apiUrl = 'http://localhost:4000';

  constructor() {
    this.studentForm = this.fb.group({
      Nombre: ['', [Validators.required, Validators.minLength(2)]],
      FechaNacimiento: ['', Validators.required],
      NombrePadre: ['', [Validators.required, Validators.minLength(2)]],
      NombreMadre: ['', [Validators.required, Validators.minLength(2)]],
      IdGrado: ['', Validators.required],
      Seccion: ['', Validators.required],
      FechaIngreso: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Establecer fecha actual como valor por defecto para fecha de ingreso
    const today = new Date().toISOString().split('T')[0];
    this.studentForm.patchValue({
      FechaIngreso: today
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.studentForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.loading = true;
      this.clearMessages();

      const formData: AlumnoFormData = {
        ...this.studentForm.value,
        IdGrado: parseInt(this.studentForm.value.IdGrado, 10)  // Convertir a entero
      };
      const headers = {
        'Content-Type': 'application/json',
        'authorization': 'prueba'
      };

      this.http.post<Alumno>(`${this.apiUrl}/crear-alumno`, formData, { headers: headers })
        .subscribe({
          next: (response) => {
            this.successMessage = `Alumno ${response.Nombre} registrado exitosamente`;
            this.resetForm();
            this.loading = false;

            // Si hay un grado seleccionado, recargar la lista
            if (this.selectedGrado) {
              this.loadStudents(this.selectedGrado);
            }
          },
          error: (error) => {
            console.error('Error al registrar alumno:', error);
            this.errorMessage = 'Error al registrar el alumno. Por favor, inténtalo de nuevo.';
            this.loading = false;
          }
        });
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  resetForm() {
    this.studentForm.reset();
    const today = new Date().toISOString().split('T')[0];
    this.studentForm.patchValue({
      FechaIngreso: today
    });
    this.clearMessages();
  }

  onGradoChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedGrado = target.value;

    if (this.selectedGrado) {
      this.loadStudents(this.selectedGrado);
    } else {
      this.students = [];
    }
  }


  loadStudents(idGrado: string) {
    const headers = {
      'Content-Type': 'application/json',
      'authorization': 'prueba'
    };

    this.http.get<Alumno[]>(`${this.apiUrl}/consultar-alumno/${idGrado}`,
      { headers: headers }
    ).subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (error) => {
        console.error('Error al cargar alumnos:', error);
        this.errorMessage = 'Error al cargar la lista de alumnos.';
        this.students = [];
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
  }

  private markAllFieldsAsTouched() {
    Object.keys(this.studentForm.controls).forEach(key => {
      this.studentForm.get(key)?.markAsTouched();
    });
  }

  private clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
  ]
});