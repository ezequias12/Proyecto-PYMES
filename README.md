# PYMES Management System - Plataforma Full Stack de Gestión de Inventario

Desarrollé una aplicación web completa para la gestión integral de inventario, productos y usuarios en pequeñas y medianas empresas.

## ARQUITECTURA DEL PROYECTO

Backend (Node.js + Express):
• API RESTful con 5 módulos principales (Categorías, Artículos, Usuarios, Autenticación, Mock Data)
• ORM Sequelize para gestión de base de datos SQLite
• Autenticación JWT con tokens de acceso y refresco
• Middleware personalizado para validación y autenticación
• Tests automatizados con Jest y Supertest
• Base de datos inicial con 10 categorías y +200 productos

Frontend (React + Vite):
• SPA (Single Page Application) con React Router v7
• Componentes modulares y reutilizables
• Gestión de formularios con React Hook Form
• Interfaz responsiva con Bootstrap 5
• Axios para consumo de API
• Rutas protegidas con control de acceso basado en roles
• Modal dialogs personalizados

### SEGURIDAD:
• Autenticación JWT con validación de tokens
• Rutas protegidas (RequireAuth)
• Control de acceso basado en roles (Admin/Empleado)
• Validación de entrada en formularios

### BASE DE DATOS:
• 10 Categorías: Accesorios, Audio, Celulares, Electrónica, etc.
• 200+ Productos: LEDs, Notebooks, Tablets, Accesorios
• 3 Usuarios de prueba con diferentes roles
• Stock y precios dinámicos

### FUNCIONALIDADES PRINCIPALES:
✓ Dashboard interactivo de inicio
✓ Catálogo de productos filtrable por categorías
✓ CRUD completo para productos y categorías
✓ Gestión de usuarios con roles
✓ Login/Logout con autenticación JWT
✓ Validación de formularios en tiempo real
✓ Interfaz intuitiva y responsiva
✓ Tests unitarios e integración

### STACK TÉCNICO:
Backend: Node.js, Express 5, Sequelize 6, SQLite3, JWT
Frontend: React 19, Vite 6, Bootstrap 5, React Router 7, React Hook Form, Axios
Testing: Jest, Supertest
DevTools: ESLint, Nodemon

### RESULTADOS:
Este proyecto demuestra competencia en:
• Arquitectura MVC y separación de responsabilidades
• Desarrollo Full Stack (Backend + Frontend)
• Seguridad e autenticación en aplicaciones web
• Diseño de APIs RESTful
• Manejo de estado y enrutamiento en React
• Testing de aplicaciones
• Prácticas de desarrollo profesional

#FullStack #React #NodeJS #Express #Sequelize #WebDevelopment #API #Authentication