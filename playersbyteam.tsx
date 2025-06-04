import React from 'react';
import type { Player } from '../types';

type Props = {
  team: string;
  playersByTeam: Record<string, Player[]>;
  setTeam: (team: string) => void;
};

const PlayersByTeam: React.FC<Props> = ({ team, playersByTeam, setTeam }) => {
  const teamNames = Object.keys(playersByTeam).sort();
  const players = playersByTeam[team] ?? [];

  return (
    <div className="px-4">
      {/* Heading */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Players By Team</h2>

        {/* Dropdown */}
        <label htmlFor="teamSelect" className="sr-only">
          Select Team
        </label>
        <select
          id="teamSelect"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          className="border border-blue-500 px-10 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {teamNames.map((teamName) => (
            <option key={teamName} value={teamName}>
              {teamName}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className=" table-auto min-w-full text-sm text-left">
          <thead className="bg-blue-100 text-gray-700 font-semibold">
            <tr>
              <th className="border border-gray-300 px-2 py-1 font-bold">Name</th>
              <th className="border border-gray-300 px-2 py-1 font-bold">Role</th>
              <th className="border border-gray-300 px-2 py-1 font-bold">Amount</th>
              <th className="border border-gray-300 px-2 py-1 font-bold">Team</th>
              <th className="border border-gray-300 px-2 py-1 font-bold">Country</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 1 ? 'bg-[#f2f2f2]' : ''
                } hover:bg-[#ddd] transition-colors duration-150`}
              >
                <td className="border border-gray-300 px-2 py-1">{player.name}</td>
                <td className="border border-gray-300 px-2 py-1">{player.role}</td>
                <td className="border border-gray-300 px-2 py-1">₹{player.amount.toLocaleString()}</td>
                <td className="border border-gray-300 px-2 py-1">{player.team}</td>
                <td className="border border-gray-300 px-2 py-1">{player.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayersByTeam;


