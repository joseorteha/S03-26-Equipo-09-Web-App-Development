import { ResponsivePie } from '@nivo/pie';

interface PieChartProps {
  data: any[];
}

export const PieChart = ({ data }: PieChartProps) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.6}
    padAngle={2}
    cornerRadius={8}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
    colors={['#182442', '#008f60', '#f59e0b', '#ef4444', '#6366f1']}
    arcLinkLabelsSkipAngle={10}
    arcLinkLabelsTextColor="#64748b"
    arcLinkLabelsThickness={2}
    arcLinkLabelsColor={{ from: 'color' }}
    arcLabelsSkipAngle={10}
    arcLabelsTextColor="#ffffff"
    theme={{
      labels: {
        text: { fontSize: 12, fontWeight: 700 }
      },
      legends: {
        text: { fontSize: 12, fill: '#45464e' }
      }
    }}
  />
);