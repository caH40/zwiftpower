import { useMemo, useState } from 'react';

export function useSortTeamMembers(teamMembers) {
  const [isRasing, setIsRasing] = useState(true);

  const sortedTeamMembers = useMemo(() => {
    if (teamMembers.length === 0) {
      return [];
    }

    return teamMembers.toSorted((a, b) => {
      const aFirstName = a.rider.firstName.trim().toLowerCase();
      const bFirstName = b.rider.firstName.trim().toLowerCase();

      return isRasing
        ? aFirstName.localeCompare(bFirstName)
        : bFirstName.localeCompare(aFirstName);
    });
  }, [isRasing, teamMembers]);

  return { isRasing, setIsRasing, sortedTeamMembers };
}
