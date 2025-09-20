import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

import { fetchDocument } from '../../../redux/features/api/documents/fetchDocuments';
import { resetDocument } from '../../../redux/features/api/documents/documentsSlice';
import useTitle from '../../../hook/useTitle';
import GithubButtonUrl from '../../../components/UI/GithubButtonUrl/GithubButtonUrl';
import DocumentContent from '../../../components/DocumentContent/DocumentContent';

import styles from './DevelopmentDocument.module.css';

export default function DevelopmentDocumentPage() {
  useTitle('Документация разработчика');
  const { urlSlug } = useParams();
  const [searchParams] = useSearchParams();

  const extension = searchParams.get('extension');

  const { document } = useSelector((state) => state.documents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDocument({ type: 'development', fileName: `${urlSlug}.${extension}` }));

    return () => dispatch(resetDocument());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      {document?.content && <DocumentContent content={document.content} />}

      <div className={styles.controlContainer}>
        <GithubButtonUrl href={'/documents/development'}>← Список документации</GithubButtonUrl>
      </div>
    </div>
  );
}
