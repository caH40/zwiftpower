import { useMemo } from 'react';

export function useSortTeams(teams, userInTeamId) {
  return useMemo(() => {
    if (!teams?.length) {
      return [];
    }

    let myTeam = null;
    const otherTeams = [];

    for (const team of teams) {
      if (team._id === userInTeamId) myTeam = team;
      else otherTeams.push(team);
    }

    otherTeams.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

    myTeam && otherTeams.unshift(myTeam);
    return otherTeams;
  }, [teams, userInTeamId]);
}
