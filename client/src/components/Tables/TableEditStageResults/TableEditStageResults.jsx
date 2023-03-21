import React from 'react';

import { tdLinkZP, tdRider } from '../utils/td';
import Checkbox from '../../UI/Checkbox/Checkbox';
import { putDisqualification } from '../../../api/disqualification';
import { putUnderchecking } from '../../../api/underchecking';

import SelectPenalty from '../../UI/SelectPenalty/SelectPenalty';
import cls from '../Table.module.css';
import SelectCategory from '../../UI/SelectCategory/SelectCategory';
import SelectPoints from '../../UI/SelectPoints/SelectPoints';
import SelectMultiplier from '../../UI/SelectMultiplier/SelectMultiplier';
import Button from '../../UI/Button/Button';

const TableEditStageResults = ({ results = [], setUpdate, deleteResult }) => {
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
							<div className={cls.flexBox}>
								<span>Спр({result.sprint})</span>
								<SelectMultiplier
									stageId={results[0].stageId}
									number={result.sprint}
									pointsType="pointsSprint"
									setUpdate={setUpdate}
									multiplier={result.multiplier}
								/>
							</div>
						</th>
					))}
					{results[0]?.pointsMountain?.map((result, index) => (
						<th scope="col" key={`${result._id}${result.mountain}th-sp`}>
							<div className={cls.flexBox}>
								<span>Горн({result.mountain})</span>
								<SelectMultiplier
									stageId={results[0].stageId}
									number={result.mountain}
									pointsType="pointsMountain"
									setUpdate={setUpdate}
									multiplier={result.multiplier}
								/>
							</div>
						</th>
					))}
					<th scope="col">Время</th>
					<th scope="col">Мощ,Вт</th>
					<th scope="col">Вт/кг</th>
					<th scope="col">Пульс</th>
					<th scope="col">Рост,см</th>
					<th scope="col">Вес,кг</th>
					<th scope="col">ZP-profile</th>
					<th scope="col">Результат</th>
				</tr>
			</thead>
			<tbody>
				{results.map((result, index) => (
					<tr key={result._id}>
						<th scope="row">{index + 1}</th>
						<td>
							<Checkbox
								setUpdate={setUpdate}
								apiRequest={putDisqualification}
								state={result.isDisqualification}
								resultId={result._id}
								target="DQ"
							/>
						</td>
						<td>
							<Checkbox
								setUpdate={setUpdate}
								apiRequest={putUnderchecking}
								state={result.isUnderChecking}
								resultId={result._id}
								target="UC"
							/>
						</td>
						<td>
							<SelectPenalty result={result} setUpdate={setUpdate} value={result.penalty.powerUp} />
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
								<div className={cls.flexBox}>
									<SelectPoints
										pointsType="pointsSprint"
										sequenceNumber={elm.sprint}
										result={result}
										setUpdate={setUpdate}
										multiplier={elm.multiplier}
									/>
									<span>x{elm.multiplier}</span>
								</div>
							</td>
						))}
						{result.pointsMountain.map(elm => (
							<td key={`${result._id}${elm.mountain}td-mn`}>
								<div className={cls.flexBox}>
									<SelectPoints
										pointsType="pointsMountain"
										sequenceNumber={elm.mountain}
										result={result}
										setUpdate={setUpdate}
										multiplier={elm.multiplier}
									/>
									<span>x{elm.multiplier}</span>
								</div>
							</td>
						))}
						<td>{result.time}</td>
						<td>{result.watt}</td>
						<td>{result.wattPerKg}</td>
						<td>{result.avgHeartRate}</td>
						<td>{result.heightInCentimeters}</td>
						<td>{result.heightInCentimeters}</td>
						<td>{tdLinkZP(result.zwiftRiderId)}</td>
						<td>
							<Button addCls="danger td" getClick={() => deleteResult(result._id, result.name)}>
								удалить
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default TableEditStageResults;
