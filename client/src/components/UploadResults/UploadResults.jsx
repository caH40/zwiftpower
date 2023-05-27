import React from 'react';
import { useDispatch } from 'react-redux';

import { getAlert } from '../../redux/features/alertMessageSlice';
import { checkFilename } from '../../service/protocol/file-name';
import { uploadProtocol } from '../../service/protocol/protocol';
import DlFile from '../DescriptionList/DlFile/DlFile';
import TableResultsNew from '../Tables/TableEditStageResults/TableResultsNew';
import Button from '../UI/Button/Button';
import InputFile from '../UI/InputFile/InputFile';

import styles from './UploadResults.module.css';

function UploadResults({ results, setResults, saveResults }) {
  const dispatch = useDispatch();

  const getFile = async (event) => {
    const [file] = event.target.files;
    const isCurrentName = checkFilename(file.name);
    if (isCurrentName) {
      const protocol = await uploadProtocol(file);
      setResults(protocol);
    } else {
      dispatch(
        getAlert({ message: 'Невалидное имя файла протокола!', type: 'error', isOpened: true })
      );
    }
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
          tooltip="Имя файла: 'Название серии_Stage-номер этапа.json' На данный момент 
					поддерживается только json формат."
        />
        {results.results?.length ? (
          <Button
            getClick={saveResults}
            tooltip="После сохранения протокола произойдет автоматическое 
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
}

export default UploadResults;
