import React from 'react';
import CountryBarChart from './CountryBarChart';
import RolePieChart from './RolePieChart';
import MaxByTeamBar from './MaxByTeamBar';

interface ChartsLayoutProps {
  nationalityByTeam: Record<string, { Indian: number; Overseas: number }>;
  roleDistributionByTeam: Record<string, Record<string, number>>;
  selectedTeam: string;
  maxByTeamBar: Record<string, number>;
}

const ChartsLayout: React.FC<ChartsLayoutProps> = ({
  nationalityByTeam,
  roleDistributionByTeam,
  selectedTeam,
  maxByTeamBar,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {/* Indian vs Overseas Players by Team */}
      <div className="flex-1 min-w-[350px] max-w-[500px] bg-white p-4 rounded shadow">
        <CountryBarChart data={nationalityByTeam} />
      </div>

      {/* Role Distribution Pie Chart */}
      <div className="flex-1 min-w-[350px] max-w-[400px] bg-white p-4 rounded shadow">
        <RolePieChart
          data={roleDistributionByTeam}
        />
      </div>

      {/* Max Paid Player by Team */}
      <div className="flex-1 min-w-[350px] max-w-[400px] bg-white p-4 rounded shadow">
        <MaxByTeamBar data={maxByTeamBar} />
      </div>
    </div>
  );
};

export default ChartsLayout;
