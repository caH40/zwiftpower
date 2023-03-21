import React from 'react';

import cls from './ListRiderSearch.module.css';

const ListRiderSearch = ({ riders, filteredRiders, getRiderData }) => {
	return (
		<ul className={cls.list}>
			{riders.length
				? filteredRiders.map(rider => (
						<li className={cls.item} key={rider._id} onClick={() => getRiderData(rider.zwiftId)}>
							{`${rider.lastName} ${rider.firstName} (${rider.firstNameZwift} ${rider.lastNameZwift})`}
						</li>
				  ))
				: undefined}
			{filteredRiders.length > 14 ? (
				<li className={cls.itemMore}>...еще {riders.length - filteredRiders.length} райдеров</li>
			) : undefined}
		</ul>
	);
};

export default ListRiderSearch;
