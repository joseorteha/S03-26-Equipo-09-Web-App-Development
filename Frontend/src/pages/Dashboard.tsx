import { useMemo, type JSX } from 'react';

import { dashboardMockData, MOCK_DASHBOARD_STATS } from '../features/dashboard/mocks/dashboardData';
import { LineChart } from '../components/charts/line/Line';
import { BarChart } from '../components/charts/bar/bar';
import { PieChart } from '../components/charts/pie/pie';
import { Card } from '../components/ui/Card/Card';
import { Badge } from '../components/ui/Badge/Badge';

export const DashboardPage = (): JSX.Element => {
  const stats = MOCK_DASHBOARD_STATS;

  /**
   * Transforma datos mockados al formato esperado por Nivo
   */
  const chartData = useMemo(() => {
    return {
      lineData: [
        {
          id: 'Ingresos',
          data: dashboardMockData.revenue.map(item => ({
            x: item.month,
            y: item.ingresos
          }))
        }
      ],
      pieData: dashboardMockData.leadsByStatus.map(item => ({
        id: item.estado,
        label: item.estado,
        value: item.cantidad
      })),
      barData: dashboardMockData.sources
    };
  }, []);

  // Cálculos derivados
  const totalRevenue = dashboardMockData.revenue.reduce((sum, m) => sum + m.ingresos, 0);
  const totalLeads = stats.totalContactos;
  const conversionRate = ((stats.contactosPorEstado['CLIENTE'] / stats.totalContactos) * 100).toFixed(1);

  return (
    <div className="space-y-8 p-4 md:p-6 lg:p-8 animate-fade-in">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-display-lg font-bold tracking-tight text-primary">
            Panel de Control
          </h1>
          <p className="text-on-surface-variant mt-2">
            Resumen operativo de tu CRM. Última actualización: Hoy
          </p>
        </div>
        <Badge variant="success">Sistema Online</Badge>
      </header>

      {/* KPI Cards Section - Números Grandes */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KPI 1: Revenue Total */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Ingresos Totales
              </span>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">trending_up</span>
              </div>
            </div>
            <div>
              <h3 className="text-display-md font-extrabold text-primary">
                ${(totalRevenue / 1000).toFixed(1)}K
              </h3>
              <p className="text-sm text-secondary font-semibold mt-2">
                +22% con respecto a mes anterior
              </p>
            </div>
          </div>
        </Card>

        {/* KPI 2: Total Leads */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Leads Totales
              </span>
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary">people</span>
              </div>
            </div>
            <div>
              <h3 className="text-display-md font-extrabold text-primary">
                {totalLeads.toLocaleString()}
              </h3>
              <p className="text-sm text-secondary font-semibold mt-2">
                +15% este mes
              </p>
            </div>
          </div>
        </Card>

        {/* KPI 3: Conversion Rate */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Tasa de Conversión
              </span>
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-orange-500">percent</span>
              </div>
            </div>
            <div>
              <h3 className="text-display-md font-extrabold text-primary">
                {conversionRate}%
              </h3>
              <p className="text-sm text-on-surface-variant font-semibold mt-2">
                {stats.contactosPorEstado['CLIENTE']} clientes convertidos
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Charts Section - Responsive Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Line Chart: Monthly Revenue */}
        <Card as="article" className="p-6 flex flex-col">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-primary">
              Ingresos Mensual
            </h2>
            <p className="text-sm text-on-surface-variant mt-1">
              Tendencia de ingresos (últimos 6 meses)
            </p>
          </div>
          <div className="flex-grow" style={{ minHeight: '300px' }}>
            <LineChart data={chartData.lineData} />
          </div>
        </Card>

        {/* Pie Chart: Leads by Status */}
        <Card as="article" className="p-6 flex flex-col">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-primary">
              Distribución de Leads
            </h2>
            <p className="text-sm text-on-surface-variant mt-1">
              Por estado del pipeline
            </p>
          </div>
          <div className="flex-grow" style={{ minHeight: '300px' }}>
            <PieChart data={chartData.pieData} />
          </div>
        </Card>
      </section>

      {/* Bar Chart: Leads by Source - Full Width */}
      <Card as="article" className="p-6 flex flex-col">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-primary">
            Leads por Fuente
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Rendimiento de canales de adquisición
          </p>
        </div>
        <div style={{ minHeight: '320px' }}>
          <BarChart data={chartData.barData} />
        </div>
      </Card>

    </div>
  );
};