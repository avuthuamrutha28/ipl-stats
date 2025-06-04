import React, { useState } from "react";

type Player = {
  name: string;
  role: string;
  team: string;
  country: string;
  amount: number;
};

interface Props {
  data: Record<string, Player[]>;
}

const TopPlayersTable: React.FC<Props> = ({ data }) => {
  const teams = Object.keys(data);
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);

  const teamPlayers = data[selectedTeam] || [];
  const maxAmount = Math.max(...teamPlayers.map((p) => p.amount));
  const topPlayers = teamPlayers.filter((p) => p.amount === maxAmount);

  return (
    <div className="max-w-7xl mx-auto p-3">
      <h2 className="text-3xl font-bold text-center mb-6">Top Paid Players by Team</h2>

      {/* Dropdown */}
      <div className="flex justify-center mb-10">
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="border border-blue-500 rounded px-15 py-2  focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
        <table className="custom-table w-full table-10px text-sm text-left">
          <thead>
            <tr>
              <th className=" border border-gray-300 px-10 py-5 font-semibold  bg-blue-100">Name</th>
              <th className=" border border-gray-300 px-10 py-5 font-semibold  bg-blue-100">Amount</th>
            </tr>
          </thead>
          <tbody>
            {topPlayers.map((player, index) => (
              <tr key={index}>
                <td className=" border border-gray-300 px-10 py-5 border-b">{player.name}</td>
                <td className=" border border-gray-300 px-10 py-5 border-b">₹{player.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPlayersTable;
