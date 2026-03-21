# src/features

Este directorio contiene los modulos funcionales del CRM, organizados por feature.

Cada feature puede replicar parcialmente la estructura de src (assets, components, hooks, services, types, etc.) segun su complejidad.

Ejemplo recomendado para este proyecto:

- src/features/inbox
  - inbox/components
  - inbox/hooks
  - inbox/services
  - inbox/types

- src/features/pipeline
  - pipeline/components
  - pipeline/hooks
  - pipeline/services

- src/features/reportes
  - reportes/components
  - reportes/hooks

Regla practica: si algo solo se usa dentro de una feature, vive en su carpeta de feature.
