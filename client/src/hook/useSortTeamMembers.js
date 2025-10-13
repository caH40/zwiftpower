import { useMemo, useState } from 'react';

export function useSortTeamMembers(teamMembers) {
  const [isRasing, setIsRasing] = useState(true);

  const sortedTeamMembers = useMemo(() => {
    if (teamMembers.length === 0) {
      return [];
    }

    return teamMembers.toSorted((a, b) => {
      const aLastName = a.rider.lastName.trim().toLowerCase();
      const bLastName = b.rider.lastName.trim().toLowerCase();

      return isRasing ? aLastName.localeCompare(bLastName) : bLastName.localeCompare(aLastName);
    });
  }, [isRasing, teamMembers]);

  return { isRasing, setIsRasing, sortedTeamMembers };
}
