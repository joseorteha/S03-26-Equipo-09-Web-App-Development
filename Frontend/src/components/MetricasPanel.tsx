import { useState, useEffect } from 'react';
import { metricasService, Metricas, FunnelMetricas } from '../common/apiClient';
import { Card } from './ui/Card/Card';

export const MetricasPanel = () => {
  const [metricas, setMetricas] = useState<Metricas | null>(null);
  const [funnel, setFunnel] = useState<FunnelMetricas | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarMetricas();
  }, []);

  const cargarMetricas = async () => {
    try {
      setCargando(true);
      setError(null);
      const [metricsData, funnelData] = await Promise.all([
        metricasService.getResumen(),
        metricasService.getFunnel()
      ]);
      setMetricas(metricsData);
      setFunnel(funnelData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando métricas');
    } finally {
      setCargando(false);
    }
  };

  if (cargando) return <div className="text-center py-8">Cargando métricas...</div>;
  if (error) return <div className="text-error text-center py-8">{error}</div>;

  return (
    <div className="space-y-6">
      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <p className="text-on-surface-variant text-xs font-bold uppercase">Contactos</p>
            <h3 className="text-3xl font-bold text-primary mt-2">{metricas?.totalContactos || 0}</h3>
            <p className="text-secondary text-sm mt-1">Total en CRM</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-on-surface-variant text-xs font-bold uppercase">Conversaciones</p>
            <h3 className="text-3xl font-bold text-primary mt-2">{metricas?.totalConversaciones || 0}</h3>
            <p className="text-secondary text-sm mt-1">Email + WhatsApp</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-on-surface-variant text-xs font-bold uppercase">Seguimientos</p>
            <h3 className="text-3xl font-bold text-primary mt-2">{metricas?.seguimientosPendientes || 0}</h3>
            <p className="text-secondary text-sm mt-1">Pendientes</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-on-surface-variant text-xs font-bold uppercase">Tasa Completitud</p>
            <h3 className="text-3xl font-bold text-primary mt-2">
              {metricas ? `${(metricas.tasaCompletitudSeguimientos * 100).toFixed(1)}%` : '0%'}
            </h3>
            <p className="text-secondary text-sm mt-1">Seguimientos</p>
          </div>
        </Card>
      </div>

      {/* Funnel de Conversión */}
      <Card>
        <h3 className="text-lg font-bold text-primary mb-6">Embudo de Conversión</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Leads Activos</span>
              <span className="text-sm font-bold text-primary">{funnel?.leadsActivos || 0}</span>
            </div>
            <div className="w-full bg-outline/20 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-full"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">En Seguimiento</span>
              <span className="text-sm font-bold text-primary">{funnel?.enSeguimiento || 0}</span>
            </div>
            <div className="w-full bg-outline/20 rounded-full h-2">
              <div 
                className="bg-secondary h-2 rounded-full" 
                style={{ width: `${funnel && funnel.leadsActivos ? (funnel.enSeguimiento / funnel.leadsActivos) * 100 : 0}%` }}
              ></div>
            </div>
            {funnel && (
              <p className="text-xs text-on-surface-variant mt-1">
                Conversión: {(funnel.tasaConversion_LED_a_Seguimiento * 100).toFixed(1)}%
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Calificados</span>
              <span className="text-sm font-bold text-primary">{funnel?.calificados || 0}</span>
            </div>
            <div className="w-full bg-outline/20 rounded-full h-2">
              <div 
                className="bg-warning h-2 rounded-full" 
                style={{ width: `${funnel && funnel.enSeguimiento ? (funnel.calificados / funnel.enSeguimiento) * 100 : 0}%` }}
              ></div>
            </div>
            {funnel && (
              <p className="text-xs text-on-surface-variant mt-1">
                Conversión: {(funnel.tasaConversion_Seguimiento_a_Calificado * 100).toFixed(1)}%
              </p>
            )}
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Clientes</span>
              <span className="text-sm font-bold text-primary">{funnel?.clientes || 0}</span>
            </div>
            <div className="w-full bg-outline/20 rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full" 
                style={{ width: `${funnel && funnel.calificados ? (funnel.clientes / funnel.calificados) * 100 : 0}%` }}
              ></div>
            </div>
            {funnel && (
              <p className="text-xs text-on-surface-variant mt-1">
                Conversión: {(funnel.tasaConversion_Calificado_a_Cliente * 100).toFixed(1)}%
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Contactos por Estado */}
      {metricas && (
        <Card>
          <h3 className="text-lg font-bold text-primary mb-4">Contactos por Estado</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(metricas.contactosPorEstado).map(([estado, cantidad]) => (
              <div key={estado} className="text-center p-3 bg-surface-container-low rounded-lg">
                <p className="text-on-surface-variant text-xs font-medium uppercase">{estado}</p>
                <p className="text-2xl font-bold text-primary mt-1">{cantidad}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
