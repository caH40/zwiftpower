import IconDelete from '../IconDelete';

export function RejectTeamMemberIcon({ handler }) {
  return (
    <IconDelete
      color={'orange'}
      addCls="pointer"
      squareSize={20}
      tooltip="Отказать"
      getClick={handler}
    />
  );
}
