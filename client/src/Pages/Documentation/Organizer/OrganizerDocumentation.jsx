import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

import { fetchDocument } from '../../../redux/features/api/documents/fetchDocuments';
import { resetDocument } from '../../../redux/features/api/documents/documentsSlice';
import { HelmetComponent } from '../../../components/Helmets/HelmetComponent';
import { DOCUMENTATION_HELMET_PROPS } from '../../../assets/helmet-props';
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

  const fileName = `${urlSlug}.${extension}`;

  useEffect(() => {
    dispatch(fetchDocument({ type: 'organizer', fileName }));

    return () => dispatch(resetDocument());
  }, [dispatch, fileName]);

  return (
    <div className={styles.wrapper}>
      <HelmetComponent {...DOCUMENTATION_HELMET_PROPS.ORGANIZER_DOCS} />

      {document?.content && <DocumentContent content={document.content} />}

      <div className={styles.controlContainer}>
        <GithubButtonUrl href={'/documentation/organizer'}>
          ← Список документации
        </GithubButtonUrl>
      </div>
    </div>
  );
}
