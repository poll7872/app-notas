# Aplicación de Notas

¡Bienvenido a la **Aplicación de Notas**! Esta es una aplicación web desarrollada para gestionar notas personales, permitiéndote crear, editar, archivar y eliminar notas de manera sencilla. Además, puedes categorizar tus notas para una mejor organización.

## Características principales

- **Crear notas:** Añade nuevas notas con un título, contenido y categorías.
- **Editar notas:** Modifica el contenido de tus notas existentes.
- **Archivar notas:** Cambia el estado de una nota a "archivada" para organizarla mejor.
- **Eliminar notas:** Elimina notas que ya no necesites.
- **Categorías:** Asigna categorías a tus notas para una organización más eficiente.
- **Interfaz intuitiva:** Diseño moderno y fácil de usar.

## Tecnologías utilizadas

- **Frontend:**
  - React.js
  - Tailwind CSS
  - React Router (para la navegación)
  - Context API (para la gestión del estado global)

- **Backend:**
  - Node.js
  - Express.js
  - Base de datos: mysql

- **Otras herramientas:**
  - Axios (para las solicitudes HTTP)
  - Date-fns (para el manejo de fechas)

## Capturas de pantalla

### Página principal
![Página principal](https://i.ibb.co/kV3tRnFx/Shot-2025-01-31-152224.png)

### Creación de notas
![Notas archivadas](https://i.ibb.co/vxf7S0qB/Shot-2025-01-31-152627.png)

### Editar nota
![Editar nota](https://i.ibb.co/fzqcchL7/Shot-2025-01-31-155636.png)

### Eliminar nota
![Eliminar nota](https://i.ibb.co/YFTpTsBJ/Shot-2025-01-31-155809.png)

### Visualización de la nota
![Visualización de la nota](https://i.ibb.co/ksBDK551/image.png)

### Filtrar Notas por categoría
![Filtrar Notas por categoría](https://i.ibb.co/1JZ14Q0p/Shot-2025-01-31-153455.png)

### Gestión de Categorías
![Gestión de categorías](https://i.ibb.co/rCPjhj5/Shot-2025-01-31-153542.png)

### Notas archivadas
![Notas archivadas](https://i.ibb.co/wFCwQ1M1/Shot-2025-01-31-153534.png)

### Diseño Responsive
![Diseño responsive](https://i.ibb.co/gbxN99Bn/image.png)

![Diseño responsive 2](https://i.ibb.co/bnr8pH7/image.png)
## Instalación y configuración

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

### Requisitos previos

- Node.js (v16 o superior)
- npm o yarn
- Base de datos configurada (Mysql, PostgreSQL)

### Pasos para la instalación

2. **Clona el repositorio:**

   ```bash
   git clone https://github.com/poll7872/app-notas.git
   ```

3. **Instala las dependencias:** Instala las dependencias en las carpetas backend y frontend con el comando.
```bash
npm install
```

4. **Configura las variables de entorno:** Crea un archivo `.env`  en /backend agrega y configura las variables de entorno de acuerdo a tu configuración local.
     
```env 
PORT=5000

DB_PORT=TU_DB_PORT
DB_USER=TU_USER_DB
DB_PASSWORD=TU_PASSWORD_DB
DB_HOST=TU_HOST_DB
DB_DATABASE=app-notas
```
    
5. **Inicia el servidor:** Para iniciar el servidor debes de aplicar el siguiente comando en las carpeta /backend y /frontend
```bash
npm run dev
```

## Contacto
Si tienes alguna pregunta o sugerencia, no dudes en contactarme:
- **Nombre:** Edward Ojeda España
- **Email:** edward.ojeda.es@gmail.com
- **GitHub:** [poll7872](https://github.com/poll7872)
