
# **Gestor de Accesos para Club Recreativo** 🏋️‍♂️🏊‍♀️🎾

## **Descripción** 📋
Este sistema automatiza la gestión de accesos de clientes a un club recreativo. Tradicionalmente, el control de accesos se realizaba manualmente, lo que podía llevar a errores e ineficiencias. Con este sistema, el personal del club puede gestionar eficientemente las entradas y salidas de los visitantes, mejorando la seguridad y la experiencia del cliente.

---

## **Funcionalidades** ⚙️
- **🔐 Inicio de Sesión**: Permite al personal autorizado acceder al sistema usando un nombre de usuario y contraseña.
- **👥 Administración de Usuarios**: Permite al administrador gestionar los usuarios del sistema, incluyendo registro, modificación y eliminación.
- **🧾 Registro de Clientes**: Permite registrar nuevos clientes, clasificándolos en visitantes o miembros.
- **🚪 Registro de Entrada y Salida**: Control de las entradas y salidas de los clientes, con registro de fecha y hora.
- **📊 Consulta de Registros de Acceso**: Visualización y filtro de los accesos de clientes específicos, con detalles de entradas y salidas.

---

## **Patrones de Diseño Implementados** 🛠️
El backend utiliza una arquitectura modular con la implementación de varios patrones de diseño reconocidos:

1. **📂 Repository Pattern (Patrón Repositorio):**
   - Proporciona una abstracción para la interacción con la base de datos.
   - Los repositorios implementan operaciones específicas para cada entidad, como `UsuarioRepository`, `RolRepository`, `AccesoRepository` y `ClienteRepository`.
   - Mejora la organización del código y permite realizar pruebas más fácilmente al desacoplar la lógica de acceso a datos.

2. **🧩 Dependency Injection (Inyección de Dependencias):**
   - Gestiona las dependencias de los servicios y repositorios.
   - Configurado en los contenedores de servicios del backend.

3. **💼 Service Layer (Capa de Servicio):**
   - Centraliza la lógica de negocio en servicios como `AuthService`, `ClienteService`, `AccesoService`, `UsuarioService` y `RolService`.

4. **📦 DTOs y Clases de Parámetros:**
   - Uso de objetos de transferencia de datos (DTO) y clases de parámetros para encapsular datos enviados y recibidos entre las capas.

5. **✨ Decorator Pattern (Patrón Decorador):**
   - Utilizado para manejar excepciones y autorizaciones en los controladores.

---

## **Base de Datos** 🗄️
El sistema utiliza **MySQL** como base de datos relacional. En la raíz del proyecto encontrarás una carpeta llamada `base-de-datos`, que contiene los scripts necesarios para la configuración inicial y los datos de prueba.

### **Archivos incluidos:**
1. **`creacion-bd.sql`**: 🏗️
   - Contiene las instrucciones para la creación de la base de datos, tablas y relaciones necesarias.
   - Incluye la estructura inicial de las tablas: `Usuarios`, `Roles`, `Clientes`, `Accesos`.

2. **`datos-de-prueba.sql`**: 🧪
   - Contiene datos iniciales para poblar las tablas y facilitar pruebas en entornos locales.

### **Instrucciones para Configurar la Base de Datos** ⚡
1. Asegúrate de tener un servidor MySQL en funcionamiento.
2. Accede a tu cliente MySQL o cualquier herramienta de administración de bases de datos como MySQL Workbench.
3. Ejecuta las consultas en el siguiente orden:

#### **Crear la base de datos y las tablas:** 🏗️
```bash
mysql -u usuario -p < base-de-datos/creacion-bd.sql
```

#### **Poblar la base de datos con datos de prueba:** 🧪
```bash
mysql -u usuario -p < base-de-datos/datos-de-prueba.sql
```

4. Configura el archivo `appsettings.json` del backend con las credenciales de tu base de datos:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=gestor_accesos;User Id=tu_usuario;Password=tu_contraseña;"
     }
   }
   ```

---

## **Pruebas** ✅
El proyecto incluye una cobertura completa de pruebas unitarias y de integración utilizando `xUnit` y `Moq`.

### **Servicios probados:**
- `AuthService`: Autenticación y generación de tokens JWT.
- `ClienteService`: CRUD y lógica específica de clientes.
- `AccesoService`: Gestión de accesos con filtros avanzados.
- `RolService`: Gestión de roles y búsquedas personalizadas.
- `UsuarioService`: CRUD y validación de usuarios.

### **Cobertura de casos:**
- ✅ Casos válidos: Verificación de funcionalidades esperadas.
- ❌ Casos inválidos: Manejo de errores y validaciones de datos.
- ⚠️ Casos límite: Escenarios excepcionales.

---

## **Tecnologías Utilizadas** 💻
### **Backend**:
- Lenguaje: C# 🧑‍💻
- Framework: .NET 7.0 🚀
- Base de datos: MySQL 🗄️
- Autenticación: JWT 🔐
- Documentación de API: Swagger / OpenAPI 📖
- Pruebas: xUnit, Moq ✅

### **Frontend**:
- Framework: ReactJS ⚛️
- Gestión de Estado: Redux o Context API 🔄
- Rutas: React Router 🗺️
- Llamadas a la API: Axios 🔗
- Estilos: CSS-in-JS, Material-UI 🎨

---

## **Instalación y Ejecución** 🏃‍♂️

### **Configuración de la Base de Datos** 🛠️
1. Asegúrate de tener un servidor MySQL en funcionamiento.
2. Accede a tu cliente MySQL o cualquier herramienta de administración de bases de datos como MySQL Workbench.
3. Ejecuta las consultas en el siguiente orden:

#### **Crear la base de datos y las tablas:** 🏗️
```bash
mysql -u usuario -p < base-de-datos/creacion-bd.sql
```

#### **Poblar la base de datos con datos de prueba:** 🧪
```bash
mysql -u usuario -p < base-de-datos/datos-de-prueba.sql
```

4. Configura el archivo `appsettings.json` del backend con las credenciales de tu base de datos:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=gestor_accesos;User Id=tu_usuario;Password=tu_contraseña;"
     }
   }
   ```

### **Backend** 🚀
1. Navega al directorio del backend:
   ```bash
   cd backend
   ```
2. Restaura las dependencias del proyecto:
   ```bash
   dotnet restore
   ```
3. Ejecuta el servidor:
   ```bash
   dotnet run
   ```

### **Frontend** ⚛️
1. Navega al directorio del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el servidor de desarrollo:
   ```bash
   npm start
   ```

---

### **Ejecución de Pruebas** 🧪
#### **Backend** ✅
1. Ejecuta todas las pruebas del backend:
   ```bash
   dotnet test
   ```

#### **Frontend** ✅
1. Ejecuta todas las pruebas del frontend:
   ```bash
   npm test
   ```

---

## **Contribuciones** 🤝
Las contribuciones son bienvenidas. Si deseas colaborar, realiza un fork del proyecto, crea una rama para tus cambios y envía un pull request.

---

## **Contacto** 📧
Wilfredo Marcelino Yupanqui Villagaray  
[wilino50@gmail.com](mailto:wilino50@gmail.com)
