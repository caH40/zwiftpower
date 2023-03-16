import React from 'react';

import { tdLinkZP, tdRider } from '../utils/td';
import Checkbox from '../../UI/Checkbox/Checkbox';
import { postDisqualification } from '../../../api/disqualification';
import { postUnderChecking } from '../../../api/underchecking';

import SelectPenalty from '../../UI/SelectPenalty/SelectPenalty';
import cls from '../Table.module.css';
import SelectCategory from '../../UI/SelectCategory/SelectCategory';
import SelectPoints from '../../UI/SelectPoints/SelectPoints';

const TableEditStageResults = ({ results = [], setUpdate }) => {
	return (
		<table className={`${cls.table} ${cls.table_striped}`}>
			<caption>{results[0]?.title}</caption>
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">DQ</th>
					<th scope="col">Прев.</th>
					<th scope="col">Штраф</th>
					<th scope="col">Кат.</th>
					<th scope="col">Райдер</th>
					{results[0]?.pointsSprint?.map((result, index) => (
						<th scope="col" key={`${result._id}${result.sprint}th-sp`}>
							Спринт-{result.sprint}
						</th>
					))}
					{results[0]?.pointsMountain?.map((result, index) => (
						<th scope="col" key={`${result._id}${result.mountain}th-sp`}>
							Гора-{result.mountain}
						</th>
					))}
					<th scope="col">Время</th>
					<th scope="col">Мощ,Вт</th>
					<th scope="col">Вт/кг</th>
					<th scope="col">Пульс</th>
					<th scope="col">Рост,см</th>
					<th scope="col">Вес,кг</th>
					<th scope="col">ZP-profile</th>
					<th scope="col">Комментарий</th>
				</tr>
			</thead>
			<tbody>
				{results.map((result, index) => (
					<tr key={result._id}>
						<th scope="row">{index + 1}</th>
						<td>
							<Checkbox
								setUpdate={setUpdate}
								apiRequest={postDisqualification}
								state={result.isDisqualification}
								resultId={result._id}
								target="DQ"
							/>
						</td>
						<td>
							<Checkbox
								setUpdate={setUpdate}
								apiRequest={postUnderChecking}
								state={result.isUnderChecking}
								resultId={result._id}
								target="UC"
							/>
						</td>
						<td>
							<SelectPenalty
								result={result}
								setUpdate={setUpdate}
								defaultValue={result.penalty.powerUp}
							/>
						</td>
						<td>
							<SelectCategory
								zwiftId={result.zwiftRiderId}
								stageId={result.stageId}
								value={result.category}
								setUpdate={setUpdate}
							/>
						</td>
						<td>{tdRider(result.name, result.imageSrc)}</td>
						{result.pointsSprint.map(elm => (
							<td key={`${result._id}${elm.sprint}td-sp`}>
								<SelectPoints
									pointsType="pointsSprint"
									sequenceNumber={elm.sprint}
									result={result}
									setUpdate={setUpdate}
									multiplier={elm.multiplier}
								/>
								<span> x {elm.multiplier ?? 1}</span>
							</td>
						))}
						{result.pointsMountain.map(elm => (
							<td key={`${result._id}${elm.mountain}td-mn`}>
								<SelectPoints
									pointsType="pointsMountain"
									sequenceNumber={elm.mountain}
									result={result}
									setUpdate={setUpdate}
									multiplier={elm.multiplier}
								/>
								<span> x {elm.multiplier ?? 1}</span>
							</td>
						))}
						<td>{result.time}</td>
						<td>{result.watt}</td>
						<td>{result.wattPerKg}</td>
						<td>{result.avgHeartRate}</td>
						<td>{result.heightInCentimeters}</td>
						<td>{result.heightInCentimeters}</td>
						<td>{tdLinkZP(result.zwiftRiderId)}</td>
						<td>-</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default TableEditStageResults;
