import { IconBan } from '../IconBan';

export function BanTeamMemberIcon({ handler }) {
  return (
    <IconBan addCls="pointer" squareSize={20} tooltip="Заблокировать" getClick={handler} />
  );
}
