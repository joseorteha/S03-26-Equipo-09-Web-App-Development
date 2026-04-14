# 📦 Arquitectura Modular del Frontend

## 🏗️ Estructura Organizacional

El Frontend ahora sigue una **arquitectura modular profesional** centrada en features de negocio, separando claramente la lógica de dominio de la interfaz de usuario.

```
src/
├── common/
│   ├── apiClient.ts       # Clientes HTTP y servicios compartidos
│   ├── plantillasHelper.ts # Helpers para gestión de plantillas
│   ├── getDashboardStats.ts
│   ├── i18n.ts
│   ├── utils.ts
│   ├── types.ts
│   └── services/
│
├── components/            # COMPONENTES PUROS REUTILIZABLES (UI atómica)
│   ├── ui/               # Componentes base (Button, Card, Modal, Badge, Input)
│   ├── charts/           # Gráficos (Pie, Bar, Line)
│   ├── forms/            # Formularios (LoginForm, Alert)
│   └── layout/           # Layouts maestros (DashboardLayout)
│
├── features/             # MÓDULOS COMPLETOS DE NEGOCIO
│   ├── auth/             # Autenticación (schemas, hooks)
│   │
│   ├── inbox/            # Gestión de Conversaciones
│   │   ├── components/
│   │   │   ├── InboxVendedor.tsx
│   │   │   ├── InboxAdmin.tsx
│   │   │   ├── UnifiedInbox.tsx
│   │   │   ├── ConversacionesPanel.tsx
│   │   │   ├── SeguimientosPanel.tsx
│   │   │   └── CalificadoPanel.tsx
│   │   ├── mocks/
│   │   └── index.ts
│   │
│   ├── plantillas/       # Gestión de Templates de Mensajes
│   │   ├── pages/
│   │   │   └── Plantillas.tsx
│   │   ├── mocks/
│   │   └── index.ts
│   │
│   ├── contactos/        # Gestión de Contactos/Leads
│   │   ├── components/
│   │   │   └── ContactoTable.tsx
│   │   ├── mocks/
│   │   └── index.ts
│   │
│   ├── metricas/         # Panel de Métricas y KPIs
│   │   ├── components/
│   │   │   └── AdminMetrics.tsx
│   │   ├── mocks/
│   │   └── index.ts
│   │
│   ├── dashboard/        # Dashboard Principal
│   │   └── mocks/
│   │       └── dashboardData.ts
│   │
│   ├── segmentacion/     # Segmentación de Leads
│   ├── vendedores/       # Gestión de Vendedores
│   │
│
├── hooks/               # Custom Hooks globales
│   └── useAuth.ts
│
├── pages/              # PAGE COMPONENTS (Wrappers que usan features)
│   ├── Index.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   ├── Inbox.tsx
│   ├── MiInbox.tsx
│   ├── Contactos.tsx
│   ├── Segmentacion.tsx
│   ├── Metricas.tsx
│   ├── Vendedores.tsx
│
├── routes/             # Configuración de rutas
│
└── styles/            # Estilos globales
```

---

## 🎯 Principios de Arquitectura

### 1. **Separación de Responsabilidades**
- **`components/`**: Componentes puros, reutilizables y sin lógica de negocio
- **`features/`**: Lógica de dominio, mocks y componentes específicos del módulo
- **`pages/`**: Enrutadores que ensamblan features en vistas completas
- **`common/`**: Utilidades y servicios compartidos

### 2. **Modularidad y Escalabilidad**
Cada feature es **autocontenida** y puede tener:
- `components/` - Componentes específicos del módulo
- `mocks/` - Datos mock para desarrollo
- `services/` - Servicios locales (si es necesario)
- `hooks/` - Hooks específicos del módulo
- `index.ts` - Exports públicos

### 3. **Imports Limpios**
Antes ❌:
```typescript
import { InboxAdmin } from '../../../components/InboxAdmin';
```

Ahora ✅:
```typescript
import { InboxAdmin } from '@/features/inbox';
```

---

## 📊 Estructura de Features

### `src/features/inbox/` - Gestión Omnicanal

**Componentes:**
- `InboxVendedor.tsx` - Bandeja de entrada vendedor con plantillas
- `InboxAdmin.tsx` - Bandeja de entrada admin con asignación
- `UnifiedInbox.tsx` - Vista unificada de conversaciones
- `ConversacionesPanel.tsx` - Panel lateral de conversaciones
- `SeguimientosPanel.tsx` - Panel de seguimientos y tareas
- `CalificadoPanel.tsx` - Panel de leads calificados

**Estado:**
- Usa `plantillasHelper.ts` para gestión centralizada de templates
- Persiste en localStorage con key `'plantillas_crm'`

---

### `src/features/plantillas/` - Gestión de Templates

**Página:**
- `Plantillas.tsx` - Interfaz para crear, editar, listar plantillas

**Funcionalidad:**
- Crear plantillas con variables `{{variable}}`
- Filtrar por tipo (Email/WhatsApp)
- Auto-extracción de variables
- Persistencia en localStorage

---

### `src/features/contactos/` - Gestión de Contactos

**Componentes:**
- `ContactoTable.tsx` - Tabla de contactos/leads con 3 estados (Lead Activo, Cliente, Inactivo)

---

### `src/features/metricas/` - Dashboard de KPIs

**Componentes:**
- `AdminMetrics.tsx` - Panel completo de métricas (KPIs, funnel, revenue, etc.)

**Características:**
- Gráficas interactivas (funnel, barras, distribución)
- Exportación a PDF
- 9+ métricas principales

---

## 🔄 Flujo de Datos

```
Pages (Enrutamiento)
    ↓
Features (Lógica de Negocio)
    ↓
Components (UI Pura)
    ↓
apiClient / Utils (Servicios Compartidos)
```

---

## 📝 Convenciones

### Imports Relativos vs Absolutos

**Dentro de un feature (relativo):**
```typescript
import { Card } from '../../../components/ui/Card/Card';
```

**Entre features (usar index.ts):**
```typescript
import { InboxAdmin } from '@/features/inbox';
```

### Estructura de Archivos en Features

```
src/features/[nombre]/
├── components/     # Componentes React
├── mocks/         # Datos de prueba
├── services/      # Servicios locales (opcional)
├── hooks/         # Custom hooks (opcional)
└── index.ts       # Exports públicos
```

---

## 🚀 Preparación para Backend

La arquitectura está lista para integración:

1. **Reemplazar mocks**: Los archivos en `mocks/` pueden ser reemplazados por llamadas API
2. **Servicios centralizados**: `common/apiClient.ts` contiene la interfaz para consumir backend
3. **Separación de concerns**: La lógica de API está desacoplada de componentes

### Próximos pasos:
- Conectar `apiClient.ts` a endpoints reales del backend
- Mover servicios a `common/services/`
- Implementar estado global (si es necesario)

---

## ✅ Checklist de Mantenimiento

- [ ] Cada nuevo componente debe estar en su feature correspondiente
- [ ] Prohibido dejar archivos sueltos en `src/`
- [ ] Los `index.ts` de features deben estar actualizados
- [ ] Componentes UI deben ser puros y sin lógica de negocio
- [ ] Testing debe cubrir lógica de features, no solo UI

---

**Arquitecto:** Senior Frontend Engineer  
**Fecha:** 2026-04-13  
**Estado:** ✅ Operacional y pronto para integración con Backend
