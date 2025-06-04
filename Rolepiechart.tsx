import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface RolePieChartProps {
  data: Record<string, Record<string, number>>; // team -> role -> count
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F', '#A28CF1', '#45C4B0', '#FFB3BA'];

const ITEMS_PER_PAGE = 1;

const RolePieChart: React.FC<RolePieChartProps> = ({ data }) => {
  const teams = Object.keys(data);
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);
  const [page, setPage] = useState(0);

  const roleDataObj = data[selectedTeam] || {};
  const chartData = Object.entries(roleDataObj).map(([name, value]) => ({ name, value }));

  const total = chartData.reduce((sum, entry) => sum + entry.value, 0);
  const totalPages = Math.ceil(chartData.length / ITEMS_PER_PAGE);

  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
    name: string;
  }) => {
    const excludedRoles = ['Batter/Wicketkeeper', 'Wicketkeeper/Batter'];
    if (excludedRoles.includes(name)) return null;

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        {(percent * 100).toFixed(1)}%
      </text>
    );
  };

  // Paginate chart data
  const startIndex = page * ITEMS_PER_PAGE;
  const paginatedLegend = chartData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // When team changes reset page to 0
  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(e.target.value);
    setPage(0);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4 text-center">Role Distribution</h2>

      {/* Team Selector */}
      <div className="mb-4">
        <select
          value={selectedTeam}
          onChange={handleTeamChange}
          className="border px-4 py-2 rounded"
        >
          {teams.map(team => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="90%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            labelLine={false}
            label={renderLabel}
          >
            {chartData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number, name: string) => [`${value}`, name]} />
        </PieChart>
      </ResponsiveContainer>

      {/* Paginated Legend */}
      <div className="mt-4 flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-4 mb-2">
          {paginatedLegend.map((entry, index) => {
            const percentage = total ? ((entry.value / total) * 100).toFixed(1) : "0.0";
            const colorIndex = startIndex + index;
            return (
              <div key={`legend-${colorIndex}`} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: COLORS[colorIndex % COLORS.length] }}
                />
                <span className="text-sm font-medium">
                  {entry.name}: {percentage}%
                </span>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        <div className="flex gap-2">
          <button
            className="px-2 py-1 border rounded text-sm"
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
          >
            Previous
          </button>
          <button
            className="px-2 py-1 border rounded text-sm"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={page === totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RolePieChart;
