import React from 'react';

import { tdLinkZP, tdRider } from '../utils/td';
import cls from '../Table.module.css';
import { secondesToTime } from '../../../utils/date-convert';

const TableResultsNew = ({ results = [] }) => {
	return (
		<table className={`${cls.table} ${cls.table_striped}`}>
			<caption>Протокол</caption>
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Райдер</th>
					<th scope="col">Время</th>
					<th scope="col">Мощ,Вт</th>
					<th scope="col">Вт/кг</th>
					<th scope="col">Пульс</th>
					<th scope="col">Рост,см</th>
					<th scope="col">Вес,кг</th>
					<th scope="col">ZP-profile</th>
				</tr>
			</thead>
			<tbody>
				{results.map((result, index) => (
					<tr key={result.zwiftId}>
						<th scope="row">{index + 1}</th>
						<td>{tdRider(result.name, result.imageSrc)}</td>
						<td>{secondesToTime(result.time)}</td>
						<td>{result.watt}</td>
						<td>{result.wattPerKg}</td>
						<td>{result.avgHeartRate}</td>
						<td>{result.heightInCentimeters}</td>
						<td>{result.heightInCentimeters}</td>
						<td>{tdLinkZP(result.zwiftId)}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default TableResultsNew;
