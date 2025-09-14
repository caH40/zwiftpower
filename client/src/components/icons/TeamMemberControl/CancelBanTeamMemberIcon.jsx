import { IconBan } from '../IconBan';

export function CancelBanTeamMemberIcon({ handler }) {
  return (
    <IconBan
      color="green"
      addCls="pointer"
      squareSize={20}
      tooltip="Снять блокировку"
      getClick={handler}
    />
  );
}
