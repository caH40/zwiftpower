import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchDocuments } from '../../../redux/features/api/documents/fetchDocuments';
import { resetDocuments } from '../../../redux/features/api/documents/documentsSlice';
import useTitle from '../../../hook/useTitle';

import DocumentsListPage from '../../../components/DocumentsListPage/DocumentsListPage';

export default function DevelopmentDocumentsPage() {
  useTitle('Документация разработчика - Список файлов');
  const { documents } = useSelector((state) => state.documents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDocuments({ type: 'development' })).unwrap();

    return () => dispatch(resetDocuments());
  }, [dispatch]);

  return (
    <DocumentsListPage
      documents={documents}
      title={'Техническая документация'}
      subtitle={'Архитектура системы, API reference и руководства для разработчиков'}
      sectionTitle={'Технические документы'}
      sectionDescription={'Изучите внутреннее устройство системы и API для интеграций'}
      type={'development'}
      chapterType={'разработка'}
    />
  );
}
