import { MetricasPanel } from '../components/MetricasPanel';
import { ExportPanel } from '../components/ExportPanel';

export const MetricasPage = () => {
  return (
    <div className="space-y-6 p-4 md:p-6 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Panel de Análisis y Métricas
        </h1>
        <p className="text-on-surface-variant text-base mt-1">
          Visualiza el desempeño del CRM, embudo de ventas, y genera reportes detallados
        </p>
      </header>

      {/* Métricas principales */}
      <MetricasPanel />

      {/* Panel de exportación */}
      <ExportPanel />
    </div>
  );
};
