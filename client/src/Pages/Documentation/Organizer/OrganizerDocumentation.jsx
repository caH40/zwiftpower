import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

import { fetchDocument } from '../../../redux/features/api/documents/fetchDocuments';
import { resetDocument } from '../../../redux/features/api/documents/documentsSlice';
import useTitle from '../../../hook/useTitle';
import GithubButtonUrl from '../../../components/UI/GithubButtonUrl/GithubButtonUrl';
import DocumentContent from '../../../components/DocumentContent/DocumentContent';

import styles from '../Documentation.module.css';
import { HelmetDocumentationItem } from '../../../components/Helmets/HelmetDocumentationItem';

const type = 'organizer';

export default function OrganizerDocumentationPage() {
  useTitle('Документация организатора');
  const { urlSlug } = useParams();
  const [searchParams] = useSearchParams();

  const extension = searchParams.get('extension');

  const { document } = useSelector((state) => state.documents);
  const dispatch = useDispatch();

  const fileName = `${urlSlug}.${extension}`;

  useEffect(() => {
    dispatch(fetchDocument({ type, fileName }));

    return () => dispatch(resetDocument());
  }, [dispatch, fileName]);

  return (
    <div className={styles.wrapper}>
      {document?.content && (
        <>
          <HelmetDocumentationItem
            type={type}
            contentTitle={document?.content.match(/^#\s+(.*)/m)?.[1]}
            url={`/${type}/${urlSlug}?extension=${extension}`}
          />

          <DocumentContent content={document.content} />
        </>
      )}

      <div className={styles.controlContainer}>
        <GithubButtonUrl href={'/documentation/organizer'}>
          ← Список документации
        </GithubButtonUrl>
      </div>
    </div>
  );
}
