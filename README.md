# **Spark:**

# Donde las grandes ideas comienzan con una chispa.

**Descripción del Proyecto:**

**Spark** es una plataforma de microblogging diseñada para capturar y compartir pensamientos, ideas y actualizaciones en su estado más puro: directos y con impacto. El espacio donde las conversaciones nacen de una chispa, permitiendo a los usuarios conectar a través de hilos de contenido dinámico y una interfaz minimalista que prioriza la inmediatez y la autenticidad.  
**Objetivo Principal:**   
Devolverle la esencia a la palabra escrita. En **Spark**, cada publicación es el inicio de algo más grande: donde cada "chispa" (publicación) tenga el potencial de encender debates significativos, conectar comunidades con intereses comunes y mantener a los usuarios actualizados de lo que ocurre en el mundo, es una chispa que activa el debate, inspira la creatividad y conecta mentes en tiempo real.  

**Capturas de Pantalla del Proyecto:**  
**![][image1]**

**Prerrequisitos o Dependencias:** 

* **Entorno de ejecución:** Node.js v24.13.0.(v18 o superior)  
* **Framework de servidor:** Express.js v5.2.1.  
* **Gestión de variables:** Dotenv 17.3.1  
* **Persistencia inicial:** Sistema de archivos (Módulo fs) para logs de acceso.  
* **Base de Datos:** PostgreSQL 18.2 con Sequelize 6.37.8 ORM.

Se utilizó Windows 10 y JavaScrip ES11+.

**Instalación del Proyecto:**  
**\# Paso 1:** Clonar el repositorio e instalar las dependencias: 	git clone           
cd spark  
npm install

**\# Paso 2:** Configurar variables de entorno: Crea un archivo .env en la raíz del proyecto con los siguientes datos:  
PORT \= 3333  
DB\_NAME\=spark\_db  
DB\_USER\=  (Tu usuario de Postgres)  
DB\_PASSWORD=  (Tu contraseña)  
DB\_HOST\=localhost  
El servidor estará corriendo en: **http://localhost:3333**

**Instrucciones para ejecutar el proyecto:**   
Se pueden utilizar los scripts: npm run dev, npm start y npm run seed   :

**\-Modo Desarrollo (con Nodemon):** Para iniciar el servidor en modo desarrollo y realizar cambios en tiempo real: **npm run dev**  
Se eligió esta herramienta como dependencia de desarrollo para automatizar el reinicio del servidor ante cualquier cambio en el código, optimizando el tiempo de respuesta durante la programación.

**\-Modo Producción:** Ejecución estándar de Node.js: Es el comando convencional para entornos de producción donde no se requiere el monitoreo constante de cambios, asegurando un inicio limpio y directo de la app: **npm start**

**Instrucciones para cargar la BdD o migrar los modelos:**   
Antes de iniciar el servidor, es necesario preparar el entorno de PostgreSQL:  
El proyecto utiliza la sincronización automática de Sequelize para facilitar el desarrollo inicial. Debes tener **PostgreSQL** instalado y corriendo.  
**\# Paso 1:** Crea la base de datos manualmente desde pgAdmin o tu terminal SQL:  
CREATE DATABASE spark\_db;  
**\# Paso 2:** Sincronización: Al ejecutar el proyecto con npm run dev, el servidor ejecutará sequelize.sync({ alter: true }), creando automáticamente las tablas necesarias para las "chispas".

**Instrucciones para cargar datos semilla a la BdeD:**

### **\-Carga de Datos Iniciales:** Si deseas limpiar la base de datos y simular una "chispa" de prueba inicial, ejecuta: **npm run seed** y luego **npm start**

**Importante:** Ejecuta este comando con el servidor apagado y luego de usarlo, ejecutar **npm start** para evitar bloqueos en PostgreSQL.

**Credenciales de Acceso**   
**Para Usuario Tipo Administrador**   
Email: administrador@mail.com   
Contraseña: Abc123\#

**Para Usuario Tipo User**   
Email: user@mail.com   
Contraseña: Abc123\# 

### **Justificación Técnica:**

* **Arquitectura Modular**: Se organizó el proyecto en carpetas para garantizar la escalabilidad y facilitar el mantenimiento del código a medida que crece la app.

**Estructura del Proyecto: Se utilizaron las siguientes carpetas:**

* config/: Configuración de la base de datos (Sequelize).  
  * controllers/: Lógica y manejo de respuestas.  
  * middlewares/: Funciones intermedias como el Logger.  
  * models/: Definición de tablas y validaciones del ORM.  
  * routes/: Definición de los endpoints de la aplicación.  
  * public/: Archivos estáticos (CSS, JS cliente).  
  * views/: Plantillas dinámicas usando **HBS.**  
  * logs/: Almacenamiento del archivo log.txt para persistencia plana.  
      
* **Nombre del archivo principal**: Se utilizó index.js por ser la convención estándar en el ecosistema Node.js, facilitando la identificación del punto de entrada para herramientas de despliegue y de otros desarrolladores.  
* **Uso de Motores de Plantilla (HBS)**: Se implementó Handlebars para cumplir con el objetivo de servir contenido web dinámico, permitiendo inyectar datos del backend directamente en el HTML.  
* **Persistencia Híbrida**: Se integró el módulo fs para el registro de auditoría en log.txt (persistencia plana) y **Sequelize** con PostgreSQL para la gestión de datos complejos de los usuarios y chispas (persistencia relacional).  
* **Seguridad:** El puerto se maneja mediante variables de entorno (dotenv) para proteger la configuración del entorno local, garantizando la seguridad y portabilidad del código.

**Decisiones de Diseño:**   
Para el desarrollo de Spark, se tomaron decisiones estratégicas para mejorar la experiencia del usuario y la mantenibilidad del código: Límite de 300 caracteres: A diferencia del estándar de 280, opté por 300 para permitir un español más natural, evitando abreviaturas forzadas y priorizando la calidad ortográfica sin perder la esencia del microblogging.

**Colaboradores**  
**Claudia** **Cofré** \- Idea, desarrollo Backend y documentación de Spark.

**Licencia**   
Este proyecto está bajo la Licencia MIT \- ve el archivo license.md para detalles.
