# src/assets

Los recursos estaticos dentro de src/assets se empaquetan junto con la aplicacion.

Si un recurso se importa desde codigo (imagenes, iconos, fuentes o archivos de traduccion), debe vivir dentro de src.

Estructura sugerida para este CRM:

- src/assets/images
  - src/assets/images/webp
  - src/assets/images/png
- src/assets/icons
- src/assets/fonts
- src/assets/locales

Usa nombres descriptivos para facilitar mantenimiento entre modulos (inbox, pipeline, reportes, autenticacion).
