import React from 'react';

import { uploadSchedule } from '../../service/schedule/schedule';
import DlFile from '../DescriptionList/DlFile/DlFile';
import TableSeriesNew from '../Tables/Series/TableSeriesNew';
import TableStagesNew from '../Tables/Stages/TableStagesNew';
import Button from '../UI/Button/Button';
import InputFile from '../UI/InputFile/InputFile';

import styles from './UploadSeriesAndStage.module.css';

const UploadSeriesAndStage = ({ schedule, setSchedule, saveSchedule }) => {
  const getFile = async (event) => {
    const scheduleNew = await uploadSchedule(event.target.files[0]);
    setSchedule(scheduleNew);
  };
  return (
    <>
      {schedule.fileAttributes ? (
        <>
          <DlFile file={schedule.fileAttributes} addCls="mbRem" />
          <TableSeriesNew series={schedule.scheduleSeries} />
          <TableStagesNew stages={schedule.scheduleStages} />
        </>
      ) : (
        ''
      )}
      <div className={styles.box__buttons}>
        <InputFile accept={'.xlsx'} getFile={getFile} />
        {schedule.fileAttributes ? <Button getClick={saveSchedule}>Сохранить</Button> : ''}
      </div>
    </>
  );
};

export default UploadSeriesAndStage;
