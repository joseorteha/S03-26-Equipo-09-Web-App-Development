# 👥 Feature: Contactos (Gestión de Leads)

Módulo para **gestionar contactos, leads y clientes** con clasificación en 3 estados operacionales.

## 📂 Estructura

```
src/features/contactos/
├── components/
│   └── ContactoTable.tsx  # Tabla de contactos
└── index.ts
```

## 🎯 Funcionalidades

### ContactoTable
- Tabla de contactos/leads con 3 estados:
  - **Lead Activo** 🔵 - Recién capturados, en evaluación
  - **Cliente** 🟢 - Ha realizado compra
  - **Inactivo** 🔴 - Sin respuesta o bloqueados
- Filtros por estado y búsqueda
- Información de vendedor asignado
- Acciones contextuales

## 📊 Estados de Contacto

| Estado | Definición | Color | Acción |
|--------|-----------|-------|--------|
| Lead Activo | Prospecto con potencial | Azul | Seguimiento |
| Cliente | Compra realizada | Verde | Retención |
| Inactivo | Sin actividad reciente | Rojo | Reactivar |

## 🔗 Dependencias
- `../../common/apiClient.ts` - Servicio de contactos
- `../../components/ui/**` - UI componentes

## 🚀 Ready for Backend
- [ ] Conectar a `GET /api/contactos`
- [ ] Implementar paginación
- [ ] Agregar ordenamiento por columnas
- [ ] Filtros avanzados (fecha, vendor, etc.)
- [ ] Acciones (editar, eliminar, asignar)
