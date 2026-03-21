# **Memoria Técnica y Modelo de Negocio**

**Startup CRM \- Plataforma de Gestión Omnicanal**

Marzo 2026

# **1\. Resumen Ejecutivo**

El Startup CRM es una plataforma de gestión de relaciones con clientes diseñada específicamente para startups y pequeñas empresas en Latinoamérica. Su propósito es centralizar la comunicación omnicanal (WhatsApp \+ Email) mediante integraciones nativas con las APIs de Meta y Brevo, eliminando intermediarios costosos y permitiendo que los equipos de ventas optimicen su funnel de conversión en tiempo real.

**Diferencial Clave:** Integración nativa sin intermediarios (sin Twilio, sin BSPs), arquitectura escalable con base de datos híbrida, interfaz intuitiva que anticipa necesidades (Zero Interface), y modelo de negocio predecible a partir de $0 MRR para equipos pequeños.

# **2\. Oportunidad de Mercado**

**Tamaño de Mercado**

* Mercado Global de CRM: $80B (2024) → Proyección $262.74B (2032), CAGR 12.8%

* Mercado LATAM: 720,000 startups y PYMEs como TAM inicial; SAM de $259M/año en 5 años

**Brecha Identificada (The Gap)**

* 60% de empresas en LATAM No logran integrar WhatsApp nativamente con sus CRMs

* Soluciones actuales costo-prohibitivas: HubSpot Pro $100+/mes; Salesforce desde $165/mes

* Tasa de apertura WhatsApp Business: 98% vs 21.5% en Email; penetración LATAM \>90% en Brasil, México, Colombia

# **3\. Proposición de Valor**

Para Equipos de Ventas:

* Inbox Unificado: WhatsApp \+ Email en una sola interfaz. Sin cambiar de aplicaciones.

* Velocidad de Respuesta (Speed-to-Lead): 35-50% de ventas van al primero que responde. Sistema optimiza reactividad.

* Automatización de Seguimientos: BullMQ orquesta recordatorios, tareas y alerts sin fricción manual.

* Visibilidad en Tiempo Real: KPIs críticos (Deal Velocity, Lead Scoring, Conversion Rate) sin arrastrar datos.


Para la Empresa:

* Modelo SaaS predecible: Free tier → Teams ($50-200/mes/equipo) → Enterprise (custom)

* Sin Intermediarios: Integración nativa \= márgenes más altos. Meta paga a nosotros, no a Twilio.

* Escalabilidad Técnica: PostgreSQL \+ MongoDB hybrid mantiene costos bajos mientras crece a 10,000+ usuarios.

* Retención Elevada: Una vez que los equipos centralizan comunicación, el churn es bajo (\<10% anual).

# **4\. Arquitectura Técnica**

**4.1 Stack Tecnológico**

| Capa | Tecnología | Justificación |
| :---- | :---- | :---- |
| Frontend | React \+ Vite \+ Tailwind | Compilación rápida, HMR, UI responsiva sin overhead CSS |
| Backend | Java \+ Spring Boot | Type-safety, ecosistema maduro, performance bajo carga |
| BD Core | PostgreSQL 16 | ACID compliance, índices B-Tree para funnel, integridad referencial |
| BD Telemetría | MongoDB 7.0 | Schema-less para evolución de webhooks, escalabilidad horizontal |
| Colas | BullMQ \+ Redis | Desacoplamiento async, reintentos, persistencia de delayed jobs |
| APIs | Meta Cloud v21 \+ Brevo v3 | Nativas, sin intermediarios, acceso directo a datos |

**4.2 Justificación de Decisiones Arquitectónicas**

**Persistencia Políglota (PostgreSQL \+ MongoDB)**

PostgreSQL alberga la 'verdad' transaccional: contactos, estados del funnel, eventos atómicos de cambio de etapa. Su modelo ACID garantiza consistencia si dos agentes intentan mover un lead simultáneamente. MongoDB almacena telemetría: hilos de conversación, payloads de webhooks, logs de eventos. Schema-less es crítico porque los formatos de Meta y Brevo evolucionan; sin MongoDB, cada cambio en sus APIs requeriría migrations costosas en PostgreSQL.

**BullMQ \+ Redis para Asincronía**

Cuando un usuario programa un recordatorio para mañana a las 3 PM, no queremos que la aplicación espere. BullMQ lo encola en Redis. Si el servidor se reinicia, el job persiste. Reintentos automáticos ante fallos de Meta/Brevo mantienen la confiabilidad sin afectar la UX.

**React \+ Vite \+ Tailwind**

React permite interfaces reactivas (componentes que se actualizan con webhooks en tiempo real). Vite ofrece compilación sub-segundo durante desarrollo. Tailwind evita overhead CSS y garantiza responsividad en móvil (crítico para equipos de ventas field).

**Spring Boot para Backend**

Java escala bien bajo concurrencia. Spring Boot abstrae boilerplate permitiendo enfoque en lógica de negocio. Integración con bibliotecas de seguridad (OAuth2, JWT) es robusta, esencial para manejar tokens de Meta y transacciones sensibles.

# **5\. Flujos de Datos Críticos**

**5.1 Ingesta de Webhook (Bidireccional)**

1\) Cliente envía mensaje en WhatsApp → Meta Webhook → Backend recibe en \<100ms. 2\) Backend valida handshake (hub.challenge), verifica VERIFY\_TOKEN. 3\) Mensaje se parsea y entra en cola BullMQ. 4\) Worker consume, guarda en MongoDB (telemetría) y despierta el Frontend vía WebSocket. 5\) Unified Inbox renderiza en \<2 minutos. Email sigue flujo similar vía Brevo Webhook.

**5.2 Transición de Pipeline (Cambio de Etapa)**

Usuario mueve contacto de 'Contactado' a 'Negociación' en Kanban. Frontend envia PUT /leads/{id}/stage. Backend ejecuta transacción: 1\) Lock el registro en PostgreSQL. 2\) Valida reglas de negocio. 3\) Actualiza lead\_stage, timestamp, updated\_by\_agent. 4\) COMMIT. 5\) Emite evento para otras sesiones del mismo equipo. 6\) Dispara regla de automatización (ej: enviar email plantilla). Atomicidad garantiza que nunca dos agentes mueven simultáneamente.

**5.3 Generación de Reportes y Exportación**

Usuario solicita reporte CSV de historial. Backend: 1\) Consulta PostgreSQL (leads, interacciones). 2\) Entra en cola BullMQ (no bloquea). 3\) Worker consolida MongoDB (eventos de aperturas/clics de Brevo). 4\) Genera CSV. 5\) Guarda en almacenamiento temporal. 6\) Retorna URL de descarga. Usuario nunca espera.

# **6\. Integraciones Externas**

**6.1 WhatsApp Cloud API (Meta v21.0)**

* Endpoint: POST https://graph.facebook.com/v21.0/{PHONE\_NUMBER\_ID}/messages

* Modelo 2026: Mensajes iniciados por cliente \= gratis (72-hour Free Entry Point). Respuestas dentro de 24h \= gratis. Outbound templates pre-aprobadas.

* Rate Limiting: Meta impone pacing (ej: max 1000 mensajes/min). Sistema implementa backoff exponencial para respetar límites.

* Seguridad: Handshake validation con hub.challenge, VERIFY\_TOKEN, Bearer Token para requests.

**6.2 Brevo Email API (v3)**

* Endpoint: POST https://api.brevo.com/v3/smtp/email

* Batch Sending: messageVersions\[\] permite personalizar 1000 emails en una sola llamada (eficiencia de red).

* Webhooks: Brevo notifica aperturas, clics. Backend registra en MongoDB y vincula a contact\_id.

* Rate Limits: 300 requests/min. Colas BullMQ previenen throttling.

# **7\. Seguridad y Escalabilidad**

**7.1 Seguridad**

* OAuth2 \+ JWT: Autenticación de usuarios vía JWT tokens. Tokens corta duración (15 min) con refresh tokens.

* Validación de Webhooks: Meta/Brevo firman sus payloads con HMAC. Backend valida firma antes de procesar.

* Encriptación TLS/SSL: Todo tráfico HTTPS. Secretos almacenados en variables de entorno, no en código.

* Auditoría: Todos los cambios en leads se registran con timestamp, usuario, acción (audit trail).

**7.2 Escalabilidad**

* PostgreSQL: Índices en lead\_stage, created\_at, company\_id. Connection pooling (PgBouncer) para manejar 1000+ conexiones concurrentes.

* MongoDB: Sharding automático a 10M+ documentos. TTL indexes en logs para purgar datos antiguos.

* Redis: Caché de sesiones, rate limit counters. Replicación master-slave para HA.

* Backend: Containerización en Docker. Kubernetes orquesta múltiples replicas de Spring Boot. Autoescaling basado en CPU/memoria.

* CDN: Frontend assets servidos vía Cloudflare. Reduce latencia global.

# **8\. Modelo de Datos Simplificado**

**PostgreSQL \- Esquema Transaccional**

Tabla leads: id, user\_id, name, email, phone (E.164), company, stage (enum: LEAD\_NUEVO, CONTACTADO, NEGOCIACION, CLIENTE, PERDIDO), created\_at, updated\_at, updated\_by\_agent. Tabla interactions: id, lead\_id, type (WHATSAPP, EMAIL), direction (INCOMING, OUTGOING), content, timestamp. Tabla tasks: id, lead\_id, description, due\_date, status (PENDIENTE, COMPLETADO). Tabla tags: id, name, color. Lead\_tags: relación muchos-a-muchos.

**MongoDB \- Eventos y Telemetría**

Collection: message\_threads: { \_id, lead\_id, messages: \[{ from, to, body, channel, sent\_at, read\_at, metadata }\], updated\_at }. Collection: email\_events: { message\_id, lead\_id, event (OPEN, CLICK, BOUNCE), ts\_epoch, ip, user\_agent }.

# **9\. Modelo de Negocio**

**9.1 Estructura de Precios**

| Plan | Precio | Usuarios | Características |
| :---- | :---- | :---- | :---- |
| Free | $0 | 1-3 | Inbox unificado, 100 contactos, sin automatización |
| Teams | $50-200 | 4-20 | Automatización, reportes, 5k contactos, KPIs |
| Enterprise | Custom | 100+ | API access, SSO, SLA, onboarding |

**9.2 Fuentes de Ingresos**

* Suscripciones SaaS (80%): MRR de Free → Teams → Enterprise

* Add-ons (15%): SMS (Twilio integrado), AI-powered lead scoring, consultorías

* Enterprise (5%): Licencias anuales, API partners

# **10\. Ventaja Competitiva (Moat)**

* Red Integrada: Cuantos más usuarios, más valiosa la plataforma (network effects débil, pero presente).

* Switching Cost: Una vez que un equipo centraliza WhatsApp \+ Email aquí, migrar a otra herramienta es doloroso.

* Cost Leadership: Sin intermediarios (sin Twilio), márgenes más altos permiten precios agresivos.

* Ecosistema LATAM: Entendimiento profundo de mercado local, soporte en español, localización monetaria.

* Experiencia de Usuario: Zero Interface reduce fricción cognitiva. Competidores copian, pero diseño es lento.

# **11\. Conclusión**

Startup CRM no es un proyecto de software aislado; es una solución integral de negocio que combina arquitectura técnica robusta, integraciones sin fricción y un modelo económico escalable. La tecnología elegida (React, Spring Boot, PostgreSQL, MongoDB, BullMQ) es deliberada, no aleatoria: cada capa resuelve un problema específico del mercado LATAM de startups. El camino a $2.34M ARR en 3 años es alcanzable si se ejecuta con disciplina en distribución y product-market fit.