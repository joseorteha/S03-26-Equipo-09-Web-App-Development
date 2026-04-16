¡Claro que sí! Aquí tienes el contenido completo del **README.md** listo para copiar, pegar y que tu repositorio luzca como un proyecto de nivel senior.

```markdown
# 🚀 Startup CRM - Backend Engine

Este es el motor de backend para un CRM inteligente diseñado para startups. A diferencia de un CRUD tradicional, este sistema incluye **automatización de tareas**, **analítica en tiempo real** y una **arquitectura desacoplada** de alto rendimiento.

---

## 🌟 Características Principales

* **Arquitectura de Capas Profesional:** Uso estricto de **DTOs** (Data Transfer Objects) y **Mappers** para proteger el modelo de datos, optimizar las respuestas de la API y evitar recursividad infinita.
* **Motor de Automatización (Scheduler):** Procesos en segundo plano que despiertan automáticamente para revisar seguimientos pendientes y disparar alertas de negocio.
* **Dashboard de Analítica:** Endpoint centralizado (`/stats`) que provee KPIs críticos: conteo de leads, mensajes sin leer, tareas pendientes y distribución segmentada por estados.
* **Gestión de Errores Global:** Respuestas estandarizadas mediante un envoltorio `ApiResponse<T>` y manejo de excepciones centralizado para un consumo de API más sencillo desde el Frontend.
* **Modelo Colaborativo:** Soporte para múltiples **Usuarios (Agentes)**, permitiendo asignar responsables a cada contacto para trazabilidad total.

---

## 🛠️ Requisitos Técnicos

* **Java 17+** (LTS)
* **Maven 3.8+**
* **PostgreSQL 15+**
* **Lombok:** (Asegúrate de tener el plugin en tu IDE)

---

## ⚙️ Configuración e Instalación

1.  **Base de Datos:**
    Crear la base de datos en PostgreSQL:
    ```sql
    CREATE DATABASE crm_backend;
    ```

2.  **Variables de Entorno (`src/main/resources/application.properties`):**
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/crm_backend
    spring.datasource.username=tu_usuario
    spring.datasource.password=tu_password
    
    # Hibernate Config
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=false
    
    # Configuración de Logs para el Scheduler
    logging.level.com.startupcrm.crm_backend.scheduler=INFO
    

3.  **Compilar y Ejecutar:**
    bash
    mvn clean install
    mvn spring-boot:run
  

## 📡 Arquitectura de la API (Endpoints Clave)

### 📊 Dashboard & Métricas
* `GET /api/dashboard/stats` → Retorna el objeto de analítica consolidado para gráficas y KPIs.

### 👥 Gestión de Contactos (DTO Powered)
* `GET /api/contactos` → Lista detallada con estados y agentes responsables.
* `POST /api/contactos` → Creación con validaciones de campos obligatorios.

### 🕒 Seguimientos & Automatización
* `GET /api/seguimientos` → Lista de tareas programadas.
* *Nota: El sistema cuenta con un Scheduler que monitorea tareas vencidas cada 60 segundos.*



## 🏗️ Estructura del Proyecto

text
src/main/java/com/startupcrm/crm_backend/
├── controller/   # Controladores REST y Dashboard
├── dto/          # Objetos de transferencia de datos (Lombok)
├── mapper/       # Lógica de conversión Entidad <-> DTO
├── model/        # Entidades JPA (Usuario, Contacto, Seguimiento, Plantilla)
├── repository/   # Capa de persistencia (Spring Data JPA)
├── scheduler/    # Tareas automáticas de segundo plano
└── exception/    # Manejo de errores y respuestas estandarizadas


## 🧪 Formato de Respuesta Estándar

Para garantizar la consistencia, todas las respuestas siguen esta estructura:

json
{
  "success": true,
  "data": {
    "totalContactos": 45,
    "nuevosLeadsHoy": 12,
    "contactosPorEstado": {
      "NUEVO": 20,
      "EN_SEGUIMIENTO": 15,
      "CLIENTE": 10
    }
  },
  "error": null
}

## 💡 Notas de Desarrollo
Al iniciar la aplicación, el **SeguimientoScheduler** se activará automáticamente. Si existen tareas cuya fecha ya pasó y no han sido completadas, verás logs de tipo `ALERTA AUTOMÁTICA` en la terminal, simulando la notificación al agente encargado.

