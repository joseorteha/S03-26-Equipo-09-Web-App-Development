# 📊 Feature: Metricas (Dashboard de KPIs)

Módulo para **visualizar métricas, KPIs y análisis de negocio** con gráficos interactivos y exportación.

## 📂 Estructura

```
src/features/metricas/
├── components/
│   └── AdminMetrics.tsx   # Panel de métricas
└── index.ts
```

## 🎯 Funcionalidades

### AdminMetrics
- **KPIs Principales**:
  - Leads Activos
  - Clientes
  - Mensajes Enviados
  - Tasa de Respuesta

- **Gráficos**:
  - Funnel: Lead Activo → Cliente → Inactivo
  - Distribución por Canal: WhatsApp vs Email
  - Mejores Vendedores
  - Ingresos Mensuales
  - Productos Vendidos
  - Leads por Fuente: Web, Email, Referencia, Redes

- **Análisis**:
  - Motivos de No Compra (presupuesto, tiempo, competencia, otros)

- **Exportación**:
  - Botón "Descargar Reporte PDF" con contenido completo

## 📈 Datos Mock

```typescript
{
  leads_activos: 75,
  clientes: 60,
  mensajes: 342,
  tasa_respuesta: 87,
  ingresos_mensuales: 125400,
  productos_vendidos: 47,
  ...
}
```

## 🔗 Dependencias
- `jsPDF` - Exportación a PDF
- `../../components/ui/Card` - Cards para KPIs

## 🎨 Diseño
- Gradient cards para KPIs
- Colores brand: Indigo (#182442) y Esmeralda (#006c49)
- Formato profesional y limpio

## 🚀 Ready for Backend
- [ ] Conectar a `GET /api/metricas`
- [ ] Implementar rango de fechas
- [ ] Filtros por vendedor, canal, estado
- [ ] Gráficos en tiempo real
- [ ] Comparativa período anterior
