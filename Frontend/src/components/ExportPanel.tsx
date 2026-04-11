import { useState } from 'react';
import { exportService } from '../common/apiClient';
import { Card } from './ui/Card/Card';
import { Button } from './ui/Button/Button';

export const ExportPanel = () => {
  const [descargando, setDescargando] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async (formato: 'pdf' | 'csv', tipo: 'resumen' | 'funnel' | 'seguimientos') => {
    setDescargando(`${tipo}-${formato}`);
    setError(null);
    try {
      if (formato === 'pdf') {
        if (tipo === 'resumen') await exportService.descargarResumenPDF();
        else if (tipo === 'funnel') await exportService.descargarFunnelPDF();
        else if (tipo === 'seguimientos') await exportService.descargarSeguimientosPDF();
      } else {
        if (tipo === 'resumen') await exportService.descargarResumenCSV();
        else if (tipo === 'funnel') await exportService.descargarFunnelCSV();
        else if (tipo === 'seguimientos') await exportService.descargarSeguimientosCSV();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error descargando reporte');
    } finally {
      setDescargando(null);
    }
  };

  return (
    <Card>
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-primary">Exportar Reportes</h3>

        {error && (
          <div className="bg-error/10 text-error p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Resumen */}
          <div className="border border-outline rounded-lg p-4 space-y-3">
            <h4 className="font-bold text-primary text-sm">Resumen General</h4>
            <p className="text-xs text-on-surface-variant">Métricas generales del CRM</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleExport('pdf', 'resumen')}
                disabled={!!descargando}
              >
                PDF
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleExport('csv', 'resumen')}
                disabled={!!descargando}
              >
                CSV
              </Button>
            </div>
          </div>

          {/* Funnel */}
          <div className="border border-outline rounded-lg p-4 space-y-3">
            <h4 className="font-bold text-primary text-sm">Embudo de Conversión</h4>
            <p className="text-xs text-on-surface-variant">Análisis del funnel de ventas</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleExport('pdf', 'funnel')}
                disabled={!!descargando}
              >
                PDF
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleExport('csv', 'funnel')}
                disabled={!!descargando}
              >
                CSV
              </Button>
            </div>
          </div>

          {/* Seguimientos */}
          <div className="border border-outline rounded-lg p-4 space-y-3">
            <h4 className="font-bold text-primary text-sm">Seguimientos</h4>
            <p className="text-xs text-on-surface-variant">Reporte de tareas y seguimientos</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleExport('pdf', 'seguimientos')}
                disabled={!!descargando}
              >
                PDF
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleExport('csv', 'seguimientos')}
                disabled={!!descargando}
              >
                CSV
              </Button>
            </div>
          </div>
        </div>

        {descargando && (
          <div className="bg-secondary/10 text-secondary p-3 rounded-lg text-sm text-center">
            Descargando {descargando}...
          </div>
        )}
      </div>
    </Card>
  );
};
