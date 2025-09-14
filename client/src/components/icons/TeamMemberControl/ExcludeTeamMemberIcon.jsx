import IconDelete from '../IconDelete';

export function ExcludeTeamMemberIcon({ handler }) {
  return (
    <IconDelete
      addCls="pointer"
      squareSize={20}
      tooltip="Исключить из команды"
      getClick={handler}
    />
  );
}
