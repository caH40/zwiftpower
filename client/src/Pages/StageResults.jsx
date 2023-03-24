import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getResultStage } from '../api/stage';

const StageResults = () => {
  const [results, setResults] = useState([]);
  const { stageId } = useParams();

  useEffect(() => {
    getResultStage(stageId).then(data => setResults(data));
  }, [stageId]);

  return (
    <div>
      {results.map(result => (
        <div key={result._id}>{JSON.stringify(result, null, 2)}</div>
      ))}
    </div>
  );
};

export default StageResults;
