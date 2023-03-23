import React from 'react';
import Tooltip from '@mui/material/Tooltip';

const MyTooltip = ({ children, toolTip }) => {
	return (
		<Tooltip
			title={toolTip}
			componentsProps={{
				tooltip: {
					sx: {
						bgcolor: '#ffbb00',
						color: '#000000',
					},
				},
			}}
		>
			{children}
		</Tooltip>
	);
};

export default MyTooltip;
