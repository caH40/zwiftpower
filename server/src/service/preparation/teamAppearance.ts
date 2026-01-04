import { TeamRepository } from '../../repositories/Team.js';

// types
import { TSignedRidersWithTeam } from '../../types/types.interface.js';

type WithTeam = {
  team?: {
    urlSlug?: string;
    appearance?: unknown; // или TTeamAppearance
  };
};

/**
 * Добавление данных TTeamAppearance в каждый профиль в результатах.
 */
export async function addTeamAppearance<
  T extends { profileDataMain?: WithTeam; profileData: WithTeam }
>(results?: T[]): Promise<T[]> {
  if (!results) {
    return [];
  }
  const teamRepository = new TeamRepository();
  const teamsAppearances = await teamRepository.getTeamsAppearance();

  const teamsAppearancesMap = new Map(teamsAppearances.map((a) => [a.urlSlug, a.appearance]));

  const updatedResults = results.map((result) => {
    const teamUrlSlug = (result.profileDataMain?.team || result.profileData.team)?.urlSlug;

    // Нет команды у райдера.
    if (!teamUrlSlug) {
      return result;
    }

    const appearance = teamsAppearancesMap.get(teamUrlSlug);

    // Может не быть данных appearance в настройках команды.
    if (!appearance) {
      return result;
    }

    if (result.profileData?.team) {
      result.profileData.team.appearance = appearance;
    }
    if (result.profileDataMain?.team) {
      result.profileDataMain.team.appearance = appearance;
    }

    return result;
  });

  return updatedResults;
}

/**
 * Добавление данных TTeamAppearance в документ зарегистрированного участника.
 */
export async function addTeamAppearanceToSignedRiders(
  riders: TSignedRidersWithTeam[]
): Promise<TSignedRidersWithTeam[]> {
  const teamRepository = new TeamRepository();
  const teamsAppearances = await teamRepository.getTeamsAppearance();

  const teamsAppearancesMap = new Map(teamsAppearances.map((a) => [a.urlSlug, a.appearance]));

  const updatedRiders = riders.map((rider) => {
    const teamUrlSlug = rider.team?.urlSlug;
    if (!teamUrlSlug) {
      return rider;
    }

    const appearance = teamsAppearancesMap.get(teamUrlSlug);
    if (!appearance) {
      return rider;
    }

    rider.team.appearance = appearance;

    return rider;
  });

  return updatedRiders;
}
