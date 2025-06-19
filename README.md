# 📚 Prueba Técnica – Sistema de Gestión de Alumnos

Este proyecto es una prueba técnica desarrollada con **NestJS**, **Angular**, **Prisma ORM** y **SQL Server**, que permite la gestión básica de alumnos mediante una API RESTful y una interfaz web.

---

## 📌 Tecnologías utilizadas

### 🔧 Back-End
- **NestJS** – Framework para aplicaciones del lado del servidor con TypeScript.
- **Prisma ORM** – Mapeo objeto-relacional para facilitar el acceso a la base de datos.
- **SQL Server** – Base de datos relacional utilizada para el almacenamiento de los datos.
- **Swagger** – Documentación de la API.
- **Postman** – Pruebas de las rutas expuestas por el servidor.

### 🎨 Front-End
- **Angular** – Framework para construir la interfaz web.
- **Bootstrap** – Framework CSS para estilos rápidos y responsivos.

---

## 🚀 Funcionalidades

### API
- Crear alumno: `POST /crear-alumno`
- Consultar alumnos por grado: `GET /consultar-alumno/{idGrado}`

### Datos manejados
- Nombre del alumno
- Fecha de nacimiento
- Nombre del padre
- Nombre de la madre
- Grado
- Sección
- Fecha de ingreso

---

## 🧪 Uso de Postman

En la carpeta raíz encontrarás el archivo `Alumnos.postman_collection.json`, que contiene las rutas listas para probar la API en Postman. Solo necesitas importar el archivo.

---

## 🛠 Instalación y ejecución

### Back-End

```bash
cd back-end
npm install
npx prisma generate
npx prisma db push
npm run dev
```

> Asegúrate de tener configurada la conexión a tu base de datos SQL Server en el archivo `.env`.

### Front-End

```bash
cd front-end
npm install
ng serve
```
### Detalles Adicionales
Para el tema de la conexion a la base de datos se configura el tipo en schema.prisma (ejemplo: mssql, postgreSQL, MySQL, etc.)
Ejemplo URL de conexion en mssql `.env`: 

```bash 
DATABASE_URL="sqlserver://${DB_HOST}:${DB_PORT};database=${DB_DATABASE};user=${DB_USER};password=${DB_PASSWORD};trustServerCertificate=true"
```
