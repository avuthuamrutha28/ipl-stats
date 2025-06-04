import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface CountryBarChartProps {
  data: Record<string, { Indian: number; Overseas: number }>;
}

const CountryBarChart: React.FC<CountryBarChartProps> = ({ data }) => {
  // Transform the input data into an array for Recharts
  const chartData = Object.entries(data).map(([team, counts]) => ({
    team,
    Indian: counts.Indian,
    Overseas: counts.Overseas
  }));

  return (
    <div className="w-full h-[350px]">
      <h2 className="text-xl font-semibold mb-2 mt-4 text-center">Indian vs Overseas Players</h2>
      <ResponsiveContainer width="100%" height="140%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <XAxis
            dataKey="team"
            angle={-70}
            textAnchor="end"
            interval={0} // ensure all labels show
            height={60}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Indian" fill="#4ade80" name="Indian Players" />
          <Bar dataKey="Overseas" fill="#60a5fa" name="Overseas Players" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    
  );
};

export default CountryBarChart;

