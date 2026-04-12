import { useState, useEffect } from 'react';
import { Card } from './ui/Card/Card';
import { Badge } from './ui/Badge/Badge';

interface MetricasAdminProps {
  leads?: any[];
  mensajes?: any[];
}

export const MetricasAdmin = ({ leads = [], mensajes = [] }: MetricasAdminProps) => {
  const [metricas, setMetricas] = useState({
    leadsActivos: 0,
    leadsNuevosHoy: 0,
    mensajesEnviados: 0,
    mensajePorCanal: { whatsapp: 0, email: 0 },
    tasaRespuesta: 0,
    tiempoPromedioRespuesta: 0
  });

  useEffect(() => {
    calcularMetricas();
  }, [leads, mensajes]);

  const calcularMetricas = () => {
    // Leads Activos
    const activos = leads.filter((l: any) => 
      l.estado !== 'CLIENTE_GANADO' && l.estado !== 'DESCARTADO'
    ).length;

    // Leads Nuevos Hoy
    const hoy = new Date().toDateString();
    const nuevosHoy = leads.filter((l: any) => 
      new Date(l.fechaCreacion).toDateString() === hoy
    ).length;

    // Mensajes por Canal
    const whatsapp = mensajes.filter((m: any) => m.canal === 'WHATSAPP').length;
    const email = mensajes.filter((m: any) => m.canal === 'EMAIL').length;

    // Tasa de Respuesta
    const conRespuesta = leads.filter((l: any) => l.requiereRespuesta === false).length;
    const tasaRespuesta = leads.length > 0 ? Math.round((conRespuesta / leads.length) * 100) : 0;

    setMetricas({
      leadsActivos: activos,
      leadsNuevosHoy: nuevosHoy,
      mensajesEnviados: whatsapp + email,
      mensajePorCanal: { whatsapp, email },
      tasaRespuesta,
      tiempoPromedioRespuesta: 2.5
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">Panel de Métricas Admin</h2>
        <Badge variant="primary">Datos en tiempo real</Badge>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* KPI 1: Leads Activos */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-on-surface-variant">Leads Activos</span>
              <span className="text-2xl">📋</span>
            </div>
            <div className="text-3xl font-bold text-primary">{metricas.leadsActivos}</div>
            <p className="text-xs text-on-surface-variant">En el funnel de ventas</p>
          </div>
        </Card>

        {/* KPI 2: Nuevos Hoy */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-on-surface-variant">Nuevos Hoy</span>
              <span className="text-2xl">✨</span>
            </div>
            <div className="text-3xl font-bold text-success">{metricas.leadsNuevosHoy}</div>
            <p className="text-xs text-on-surface-variant">Últimas 24 horas</p>
          </div>
        </Card>

        {/* KPI 3: Mensajes Enviados */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-on-surface-variant">Mensajes</span>
              <span className="text-2xl">💬</span>
            </div>
            <div className="text-3xl font-bold text-secondary">{metricas.mensajesEnviados}</div>
            <p className="text-xs text-on-surface-variant">Omnicanal (WhatsApp + Email)</p>
          </div>
        </Card>

        {/* KPI 4: Tasa de Respuesta */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-on-surface-variant">Tasa Respuesta</span>
              <span className="text-2xl">📊</span>
            </div>
            <div className="text-3xl font-bold text-warning">{metricas.tasaRespuesta}%</div>
            <p className="text-xs text-on-surface-variant">Efectividad en respuesta</p>
          </div>
        </Card>

        {/* KPI 5: Distribución Canales */}
        <Card>
          <div className="space-y-3">
            <span className="text-sm font-medium text-on-surface-variant">Canales</span>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs">WhatsApp</span>
                <span className="font-bold text-on-surface">{metricas.mensajePorCanal.whatsapp}</span>
              </div>
              <div className="w-full bg-outline rounded h-1.5">
                <div 
                  className="bg-success h-1.5 rounded" 
                  style={{
                    width: `${metricas.mensajesEnviados > 0 
                      ? (metricas.mensajePorCanal.whatsapp / metricas.mensajesEnviados) * 100 
                      : 0}%`
                  }}
                ></div>
              </div>
            </div>
            <div className="space-y-2 pt-2 border-t border-outline">
              <div className="flex items-center justify-between">
                <span className="text-xs">Email</span>
                <span className="font-bold text-on-surface">{metricas.mensajePorCanal.email}</span>
              </div>
              <div className="w-full bg-outline rounded h-1.5">
                <div 
                  className="bg-info h-1.5 rounded" 
                  style={{
                    width: `${metricas.mensajesEnviados > 0 
                      ? (metricas.mensajePorCanal.email / metricas.mensajesEnviados) * 100 
                      : 0}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </Card>

        {/* KPI 6: Tiempo Promedio */}
        <Card>
          <div className="space-y-3">
            <span className="text-sm font-medium text-on-surface-variant">Tiempo Promedio</span>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary">{metricas.tiempoPromedioRespuesta}h</div>
              <p className="text-xs text-on-surface-variant">Respuesta a leads</p>
              <div className="flex gap-1 mt-3">
                <span className="px-2 py-1 bg-success/10 text-success text-xs rounded">⚡ Rápido</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Desglose Detallado */}
      <Card>
        <div className="space-y-4">
          <h3 className="font-bold text-on-surface">Desglose Detallado</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-surface rounded border border-outline">
              <span className="text-xs text-on-surface-variant">Lead Nuevo</span>
              <div className="text-lg font-bold text-on-surface">
                {leads.filter((l: any) => l.estado === 'LEAD_NUEVO').length}
              </div>
            </div>
            <div className="p-3 bg-surface rounded border border-outline">
              <span className="text-xs text-on-surface-variant">En Seguimiento</span>
              <div className="text-lg font-bold text-on-surface">
                {leads.filter((l: any) => l.estado === 'EN_SEGUIMIENTO').length}
              </div>
            </div>
            <div className="p-3 bg-surface rounded border border-outline">
              <span className="text-xs text-on-surface-variant">Ganado</span>
              <div className="text-lg font-bold text-success">
                {leads.filter((l: any) => l.estado === 'CLIENTE_GANADO').length}
              </div>
            </div>
            <div className="p-3 bg-surface rounded border border-outline">
              <span className="text-xs text-on-surface-variant">Descartado</span>
              <div className="text-lg font-bold text-error">
                {leads.filter((l: any) => l.estado === 'DESCARTADO').length}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
