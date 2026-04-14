# 📧 Feature: Inbox (Gestión Omnicanal)

Módulo central para la gestión de **conversaciones, mensajes y comunicaciones** con contactos a través de múltiples canales (Email, WhatsApp).

## 📂 Estructura

```
src/features/inbox/
├── components/
│   ├── InboxVendedor.tsx      # Bandeja de entrada vendedor
│   ├── InboxAdmin.tsx          # Bandeja de entrada admin
│   ├── UnifiedInbox.tsx        # Vista unificada
│   ├── ConversacionesPanel.tsx # Panel de conversaciones
│   ├── SeguimientosPanel.tsx   # Panel de seguimientos
│   └── CalificadoPanel.tsx     # Panel de leads calificados
└── index.ts
```

## 🎯 Componentes Principales

### InboxVendedor
- Bandeja de entrada personalizada para vendedores
- Filtros por canal (Email/WhatsApp) y estado
- Listado de conversaciones con vista de detalles
- **Integración con Plantillas**: Selector de templates con variables

### InboxAdmin
- Vista administrativa de todas las conversaciones
- Asignación de conversaciones a vendedores
- Reasignación con modal
- Misma integración de plantillas

### UnifiedInbox
- Vista unificada de todas las conversaciones
- Útil para dashboards y reportes

## 🔗 Dependencias
- `../../common/plantillasHelper.ts` - Helpers para gestión de plantillas
- `../../common/apiClient.ts` - Servicios de API
- `../../components/ui/**` - Componentes base

## 📊 Estado
- Conversaciones cargadas desde mock (pronto API)
- Plantillas sincronizadas con módulo de Plantillas
- Contadores de uso automáticos

## 🚀 Ready for Backend
- [ ] Conectar `cargarDatos()` a API
- [ ] Reemplazar MOCK_DATA con respuestas reales
- [ ] Implementar SSE/WebSocket para actualizaciones en tiempo real
