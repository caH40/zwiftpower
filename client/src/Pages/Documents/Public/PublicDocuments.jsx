import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDocuments } from '../../../redux/features/api/documents/fetchDocuments';
import { resetDocuments } from '../../../redux/features/api/documents/documentsSlice';
import useTitle from '../../../hook/useTitle';

import DocumentsListPage from '../../../components/DocumentsListPage/DocumentsListPage';

export default function PublicDocumentsPage() {
  useTitle('Справочник пользователя - Документы');
  const { documents } = useSelector((state) => state.documents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDocuments({ type: 'public' })).unwrap();

    return () => dispatch(resetDocuments());
  }, [dispatch]);

  return (
    <DocumentsListPage
      documents={documents}
      icon={'👤'}
      title={'Пользовательская документация'}
      subtitle={'Руководства и инструкции для участников заездов'}
      sectionTitle={'Полезные материалы'}
      sectionDescription={'Обучающие материалы и справочная информация'}
      type={'public'}
      chapterType={'пользователь'}
    />
  );
}
