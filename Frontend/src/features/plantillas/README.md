# 📋 Feature: Plantillas (Gestión de Templates)

Módulo para **crear, editar, listar y gestionar plantillas de mensajes** reutilizables en los módulos de chat.

## 📂 Estructura

```
src/features/plantillas/
├── pages/
│   └── Plantillas.tsx    # Página principal
└── index.ts
```

## 🎯 Funcionalidades

### Página Plantillas
- **Crear plantillas** con nombre, tipo (Email/WhatsApp), contenido y variables
- **Auto-extracción de variables** desde el contenido usando `{{variable}}`
- **Filtros por tipo**: Ver todas, solo Email, solo WhatsApp
- **Persistencia**: Guardado automático en localStorage `'plantillas_crm'`
- **Contador de uso**: Sigue cuántas veces se usa cada plantilla

## 📝 Estructura de Datos

```typescript
interface Plantilla {
  id: number;
  nombre: string;
  tipo: 'email' | 'whatsapp';
  contenido: string;
  variables: string[];      // Auto-extraido de {{var}}
  usosTotal: number;
  estado: 'activa' | 'inactiva';
}
```

## 🔗 Integración

### Módulos que usan Plantillas:
- ✅ `inbox/InboxVendedor` - Selector con variables
- ✅ `inbox/InboxAdmin` - Selector con variables

### Storage
- **Key**: `'plantillas_crm'`
- **Persistencia**: Browser localStorage
- **Inicial**: 4 plantillas por defecto en `plantillasHelper.ts`

## 🚀 Ready for Backend
- [ ] Migrar storage de localStorage a API REST
- [ ] Endpoint POST `/api/plantillas` - Crear
- [ ] Endpoint GET `/api/plantillas` - Listar
- [ ] Endpoint PUT `/api/plantillas/{id}` - Editar
- [ ] Endpoint DELETE `/api/plantillas/{id}` - Eliminar
- [ ] Agregar campo `usuarioId` para plantillas personales
