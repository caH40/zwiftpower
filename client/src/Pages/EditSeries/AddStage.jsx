import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../components/UI/Button/Button';
import FormEditStage from '../../components/UI/FormEditStage/FormEditStage';
import useTitle from '../../hook/useTitle';
import { stageClear } from './service';

import cls from './Edit.module.css';
import { postStage } from '../../api/stage';

const AddStage = () => {
	const [stage, setStage] = useState(stageClear);

	const navigate = useNavigate();
	const goBack = () => navigate(-1);

	const { seriesId } = useParams();
	useTitle('Редактирование данных Series');

	const sendForm = () => {
		postStage(stage);
	};

	return (
		<section className={cls.block}>
			<h3 className={cls.title}>{`Добавление нового Этапа в Series (${seriesId})`}</h3>
			<FormEditStage stage={stage} setStage={setStage} sendForm={sendForm} />
			<Button getClick={goBack}>назад</Button>
		</section>
	);
};

export default AddStage;
