import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

interface MaxByTeamBarChartProps {
  data: Record<string, number>;
}

const MaxByTeamBar: React.FC<MaxByTeamBarChartProps> = ({ data }) => {
  const chartData = Object.entries(data).map(([team, amount]) => ({
    name: team,
    amount,
  }));

  const values = Object.values(data);
  const min = Math.min(...values);
  const max = Math.max(...values);

  const tickStart = Math.floor(min / 10_000_000) * 10_000_000;
  const tickEnd = Math.ceil((max + 10_000_000) / 10_000_000) * 10_000_000;

  const ticks: number[] = [];
  for (let i = tickStart; i <= tickEnd; i += 50_000_000) {
    ticks.push(i);
  }

  const chartHeight = chartData.length * 40;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">
         Amount per Team
      </h2>
      <div style={{ height: `${chartHeight}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 60, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              domain={[tickStart, tickEnd]}
              ticks={ticks}
              tickFormatter={(v) => `₹${v.toLocaleString()}`}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={80}
              tick={{ fontSize: 14 }}
            />
            <Tooltip
              formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
            />
            <Bar dataKey="amount" fill="#3b82f6" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center mt-4 text-sm">
        <div className="w-4 h-4 bg-blue-500 mr-2 rounded-sm"></div>
        <span className="text-gray-700">Max Amount</span>
      </div>
    </div>
  );
};

export default MaxByTeamBar;
