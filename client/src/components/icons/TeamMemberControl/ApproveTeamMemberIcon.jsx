import IconAdd from '../IconAdd';

export function ApproveTeamMemberIcon({ handler }) {
  return (
    <IconAdd addCls="pointer" squareSize={20} tooltip="Принять заявку" getClick={handler} />
  );
}
