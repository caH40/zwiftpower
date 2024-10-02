import Tooltip from '@mui/material/Tooltip';

function MyTooltip({ children, tooltip = '', disabled, placement }) {
  return (
    <>
      {/* mui tooltip не работает с кнопкой которая disabled */}
      {disabled ? (
        <>{children}</>
      ) : (
        <Tooltip title={tooltip} placement={placement}>
          {children}
        </Tooltip>
      )}
    </>
  );
}

export default MyTooltip;
