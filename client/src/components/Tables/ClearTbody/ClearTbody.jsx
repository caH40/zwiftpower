import React from 'react';

const ClearTbody = ({ quantityTd }) => {
	const tds = Array(quantityTd).fill('');
	return (
		<tbody>
			<tr>
				{tds.map((_, index) => (
					<td key={index}>{'...Loading'}</td>
				))}
			</tr>
		</tbody>
	);
};

export default ClearTbody;
