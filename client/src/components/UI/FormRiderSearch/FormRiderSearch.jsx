import React from 'react';

import Button from '../Button/Button';
import ListRiderSearch from '../ListRiderSearch/ListRiderSearch';
import SimpleInput from '../SimpleInput/SimpleInput';

import styles from './FormRiderSearch.module.css';

const FormRiderSearch = ({ query, setQuery, riders, filteredRiders, getRiderData, goBack }) => {
	return (
		<form className={styles.form} name="riders">
			<SimpleInput
				name="Введите имя (фамилию) для поиска райдера"
				state={query}
				setState={setQuery}
				property="fio"
				type="text"
				placeholder="Введите имя (фамилию) райдера"
			/>
			<ListRiderSearch
				riders={riders}
				filteredRiders={filteredRiders}
				getRiderData={getRiderData}
			/>
			<Button getClick={goBack} addCls="mb30">
				назад
			</Button>
		</form>
	);
};

export default FormRiderSearch;
