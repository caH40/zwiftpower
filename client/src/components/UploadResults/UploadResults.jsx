import React from 'react';

import { uploadProtocol } from '../../service/protocol/protocol';
import DlFile from '../DescriptionList/DlFile/DlFile';
import TableResultsNew from '../Tables/TableEditStageResults/TableResultsNew';
import Button from '../UI/Button/Button';
import InputFile from '../UI/InputFile/InputFile';

import styles from './UploadResults.module.css';

const UploadResults = ({ results, setResults, saveResults }) => {
  const getFile = async event => {
    const protocol = await uploadProtocol(event.target.files[0]);
    setResults(protocol);
  };

  return (
    <>
      {results.results?.length ? (
        <>
          <DlFile file={results.fileAttributes} addCls="mbRem" />
          <TableResultsNew results={results.results} />
        </>
      ) : (
        ''
      )}
      <div className={styles.box__buttons}>
        <InputFile
          accept={'.json'}
          getFile={getFile}
          toolTip="Имя файла: 'Название серии_Stage-номер этапа.json' На данный момент 
					поддерживается только json формат."
        />
        {results.results?.length ? (
          <Button
            getClick={saveResults}
            toolTip="После сохранения протокола произойдет автоматическое 
						начисление очков генеральной квалификации."
          >
						Сохранить
          </Button>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default UploadResults;
