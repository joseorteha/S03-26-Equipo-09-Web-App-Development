import { ResponsiveBar } from '@nivo/bar';

interface BarChartProps {
  data: any[];
}

export const BarChart = ({ data }: BarChartProps) => (
  <ResponsiveBar
    data={data}
    keys={['leads']}
    indexBy="fuente"
    margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={['#008f60']} // Esmeralda Corporativo
    borderRadius={8}
    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Canal',
      legendPosition: 'middle',
      legendOffset: 32
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor="#ffffff"
    theme={{
      axis: {
        legend: {
          text: { fontSize: 12, fontWeight: 600, fill: '#64748b' }
        },
        ticks: {
          text: { fontSize: 11, fill: '#94a3b8' }
        }
      },
      grid: {
        line: { stroke: '#f1f5f9', strokeWidth: 1 }
      }
    }}
    role="application"
    ariaLabel="Gráfico de fuentes de leads"
  />
);