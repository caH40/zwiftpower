import React from 'react';

import styles from './ListRiderSearch.module.css';

const ListRiderSearch = ({ riders, filteredRiders, getRiderData }) => {
	return (
		<ul className={styles.list}>
			{riders.length
				? filteredRiders.map(rider => (
					<li className={styles.item} key={rider._id} onClick={() => getRiderData(rider.zwiftId)}>
						{`${rider.lastName} ${rider.firstName} (${rider.firstNameZwift} ${rider.lastNameZwift})`}
					</li>
				  ))
				: undefined}
			{filteredRiders.length > 14 ? (
				<li className={styles.itemMore}>...еще {riders.length - filteredRiders.length} райдеров</li>
			) : undefined}
		</ul>
	);
};

export default ListRiderSearch;
