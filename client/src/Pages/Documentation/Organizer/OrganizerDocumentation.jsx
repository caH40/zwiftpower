import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

import { fetchDocument } from '../../../redux/features/api/documents/fetchDocuments';
import { resetDocument } from '../../../redux/features/api/documents/documentsSlice';
import { HelmetComponent } from '../../../components/Helmets/HelmetComponent';
import { helmetProps } from '../../../assets/helmet-props';
import useTitle from '../../../hook/useTitle';
import GithubButtonUrl from '../../../components/UI/GithubButtonUrl/GithubButtonUrl';
import DocumentContent from '../../../components/DocumentContent/DocumentContent';

import styles from '../Documentation.module.css';

export default function OrganizerDocumentationPage() {
  useTitle('Документация организатора');
  const { urlSlug } = useParams();
  const [searchParams] = useSearchParams();

  const extension = searchParams.get('extension');

  const { document } = useSelector((state) => state.documents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDocument({ type: 'organizer', fileName: `${urlSlug}.${extension}` }));

    return () => dispatch(resetDocument());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <HelmetComponent {...helmetProps.ORGANIZER_DOCS} />

      {document?.content && <DocumentContent content={document.content} />}

      <div className={styles.controlContainer}>
        <GithubButtonUrl href={'/documentation/organizer'}>
          ← Список документации
        </GithubButtonUrl>
      </div>
    </div>
  );
}
