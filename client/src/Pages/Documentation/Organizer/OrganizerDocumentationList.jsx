import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDocuments } from '../../../redux/features/api/documents/fetchDocuments';
import { resetDocuments } from '../../../redux/features/api/documents/documentsSlice';
import { HelmetComponent } from '../../../components/Helmets/HelmetComponent';
import { DOCUMENTATION_HELMET_PROPS } from '../../../assets/helmet-props';
import useTitle from '../../../hook/useTitle';
import DocumentsListPage from '../../../components/DocumentsListPage/DocumentsListPage';

export default function OrganizerDocumentationListPage() {
  useTitle('Документация организатора - Материалы');
  const { documents } = useSelector((state) => state.documents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDocuments({ type: 'organizer' })).unwrap();

    return () => dispatch(resetDocuments());
  }, [dispatch]);

  return (
    <>
      <HelmetComponent {...DOCUMENTATION_HELMET_PROPS.ORGANIZER_DOCS} />

      <DocumentsListPage
        documents={documents}
        icon={'🎯'}
        title={'Организаторская документация'}
        subtitle={'Инструкции по созданию и управлению событиями'}
        sectionTitle={'Ресурсы для организаторов'}
        sectionDescription={'Документы для эффективного управления заездами'}
        type={'organizer'}
        chapterType={'организатор'}
      />
    </>
  );
}
