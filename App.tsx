import { useEffect, useState } from 'react';
import ChartsLayout from './components/ChartsLayout';
import TopPlayersTable from './components/TopPlayersTable';
import PlayersByTeam from './components/PlayersByTeam';
import type { Player } from './types';
import playersData from './data/players.json';

export default function IPLDashboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [team, setTeam] = useState<string >(''); // use null as initial "no team"
  const [playersByTeam, setPlayersByTeam] = useState<Record<string, Player[]>>({});

  useEffect(() => {
    setPlayers(playersData);

    // Group players by team safely
    const grouped = playersData.reduce((acc: Record<string, Player[]>, player) => {
      if (!acc[player.team]) acc[player.team] = [];
      acc[player.team].push(player);
      return acc;
    }, {});

    setPlayersByTeam(grouped);

    
    const firstTeam = Object.keys(grouped)[0] ?? null;
    setTeam(firstTeam);
  }, []);

  
  if (!team) {
    return <div className="text-center p-4">Loading IPL data...</div>;
  }

  // Total amount by team
  const totalByTeamBar = players.reduce((acc: Record<string, number>, player) => {
    acc[player.team] = (acc[player.team] || 0) + player.amount;
    return acc;
  }, {});

  // Max paid player amount per team
  const maxByTeamBar = players.reduce((acc: Record<string, number>, player) => {
    acc[player.team] = Math.max(acc[player.team] || 0, player.amount);
    return acc;
  }, {});

  // Nationality (Indian vs Overseas) per team
  const playersByTeamNationality = Object.fromEntries(
    Object.entries(playersByTeam).map(([teamName, teamPlayers]) => [
      teamName,
      {
        Indian: teamPlayers.filter((p) => !p.country.toLowerCase().includes('overseas')).length,
        Overseas: teamPlayers.filter((p) => p.country.toLowerCase().includes('overseas')).length,
      },
    ])
  );

  // Role distribution for all teams
  const roleDistributionByTeam: Record<string, Record<string, number>> = Object.fromEntries(
    Object.entries(playersByTeam).map(([teamName, teamPlayers]) => [
      teamName,
      teamPlayers.reduce((acc: Record<string, number>, player) => {
        acc[player.role] = (acc[player.role] || 0) + 1;
        return acc;
      }, {}),
    ])
  );

  // Get top 5 highest-paid players in selected team safely
  const topPaidPlayers = [...(playersByTeam[team] ?? [])]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return (
    <div className="grid gap-6 p-4">
      <div className="w-full bg-blue-100 p-4 rounded-md shadow text-center">
        <h1 className="text-3xl font-bold text-gray-800">IPL Stats</h1>
      </div>

      <ChartsLayout
        nationalityByTeam={playersByTeamNationality}
        roleDistributionByTeam={roleDistributionByTeam}
        selectedTeam={team}
        maxByTeamBar={maxByTeamBar}
      />

      
      <TopPlayersTable data={playersByTeam} />

      <PlayersByTeam team={team} playersByTeam={playersByTeam} setTeam={setTeam} />
    </div>
  );
}
