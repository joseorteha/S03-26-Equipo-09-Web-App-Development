import { ResponsiveLine } from '@nivo/line';

interface LineChartProps {
  data: any[];
}

export const LineChart = ({ data }: LineChartProps) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
    curve="catmullRom"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Mes',
      legendOffset: 36,
      legendPosition: 'middle'
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Ingresos ($)',
      legendOffset: -50,
      legendPosition: 'middle'
    }}
    colors={['#182442']} // Indigo Corporativo
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    useMesh={true}
    enableArea={true}
    areaOpacity={0.1}
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
  />
);