const useLeader = (event) => {
  if (!event) {
    return [];
  }

  const getLeaders = () => {
    const leaders = [];
    for (const subgroup of event.eventSubgroups) {
      if (subgroup.invitedLeaders) {
        leaders.push(...subgroup.invitedLeaders);
      }
    }
    return leaders;
  };

  const getSweepers = () => {
    const sweepers = [];
    for (const subgroup of event?.eventSubgroups) {
      if (subgroup.invitedSweepers) {
        sweepers.push(...subgroup.invitedSweepers);
      }
    }
    return sweepers;
  };

  return [getLeaders, getSweepers];
};

export default useLeader;
