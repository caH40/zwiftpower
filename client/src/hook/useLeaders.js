const useLeader = (event) => {
  const getLeaders = () => {
    const leaders = [];
    for (const subgroup of event?.eventSubgroups) {
      leaders.push(...subgroup.invitedLeaders);
    }
    return leaders;
  };

  const getSweepers = () => {
    const sweepers = [];
    for (const subgroup of event?.eventSubgroups) {
      sweepers.push(...subgroup.invitedSweepers);
    }
    return sweepers;
  };

  return [getLeaders, getSweepers];
};

export default useLeader;
