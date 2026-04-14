-- Usuarios
INSERT INTO usuarios (id, nombre, email, password, role, telefono, activo)
VALUES
(1, 'Admin User', 'admin@example.com', 'admin123', 'ADMIN', '555-0000', true),
(2, 'Juan Vendedor', 'juan.vendedor@example.com', 'juan123', 'VENDEDOR', '555-1111', true),
(3, 'María Vendedora', 'maria.vendedora@example.com', 'maria123', 'VENDEDOR', '555-2222', true),
(4, 'Carlos Vendedor', 'carlos.vendedor@example.com', 'carlos123', 'VENDEDOR', '555-3333', true);

-- Contactos
INSERT INTO contactos (id, nombre, email, telefono, estado)
VALUES
(1, 'Carlos Pérez', 'carlos.perez@example.com', '555-1234', 'LEAD_ACTIVO'),
(2, 'María López', 'maria.lopez@example.com', '555-5678', 'EN_SEGUIMIENTO'),
(3, 'Juan García', 'juan.garcia@example.com', '555-9012', 'CLIENTE');

-- Conversaciones (asignadas a vendedores)
INSERT INTO conversaciones (id, canal, contenido, fecha_hora, contacto_id, vendedor_asignado_id)
VALUES
(1, 'WhatsApp', 'Primera conversación con Carlos', '2026-03-20 10:00:00', 1, 2),
(2, 'Email', 'Propuesta enviada a María', '2026-03-21 15:30:00', 2, 3),
(3, 'WhatsApp', 'Confirmación de compra con Juan', '2026-03-22 14:00:00', 3, 4);

-- Seguimientos
INSERT INTO seguimientos (id, completado, fecha, tarea, contacto_id)
VALUES
(1, false, '2026-03-25', 'Llamar a Carlos para seguimiento', 1),
(2, false, '2026-03-28', 'Revisar propuesta enviada a María', 2),
(3, true, '2026-03-23', 'Confirmar entrega con Juan', 3);

-- Plantillas de Email
INSERT INTO plantillas (nombre, tipo, asunto, contenido, activa, created_at, updated_at)
VALUES
('Bienvenida', 'EMAIL', 'Bienvenido a nuestro CRM', 'Hola {nombre}, bienvenido a nuestro servicio. Estamos emocionados de trabajar contigo. Tu cuenta ha sido creada exitosamente.', true, NOW(), NOW()),
('Seguimiento', 'EMAIL', 'Seguimiento de tu solicitud', 'Hola {nombre}, queremos darte un seguimiento sobre tu solicitud. ¿Hay algo en lo que podamos ayudarte? No dude en contactarnos.', true, NOW(), NOW()),
('Cierre de Venta', 'EMAIL', 'Confirmación de tu compra', 'Hola {nombre}, gracias por tu compra. Tu pedido ha sido confirmado. Puedes rastrear tu envío usando el número de referencia: {referencia}', true, NOW(), NOW());

-- Plantillas de WhatsApp
INSERT INTO plantillas (nombre, tipo, asunto, contenido, activa, created_at, updated_at)
VALUES
('Oferta WhatsApp', 'WHATSAPP', null, 'Hola {nombre}! 🚀 Tenemos una oferta especial solo para ti: {oferta}. ¿Te gustaría conocer más detalles? 💬', true, NOW(), NOW()),
('Recordatorio', 'WHATSAPP', null, 'Hola {nombre}, solo recordarte que tienes una reunión programada para {fecha} a las {hora}. ¿Está de acuerdo con estos detalles? ✋', true, NOW(), NOW()),
('Agradecimiento', 'WHATSAPP', null, 'Hola {nombre}! Gracias por ser parte de nuestro equipo. Valoramos tu confianza y apoyo. 🙏 ¿Hay algo en lo que podamos ayudarte?', true, NOW(), NOW());
