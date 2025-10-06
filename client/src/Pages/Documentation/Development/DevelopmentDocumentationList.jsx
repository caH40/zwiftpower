import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDocuments } from '../../../redux/features/api/documents/fetchDocuments';
import { resetDocuments } from '../../../redux/features/api/documents/documentsSlice';
import { HelmetComponent } from '../../../components/Helmets/HelmetComponent';
import { DOCUMENTATION_HELMET_PROPS } from '../../../assets/helmet-props';
import useTitle from '../../../hook/useTitle';
import DocumentsListPage from '../../../components/DocumentsListPage/DocumentsListPage';

export default function DevelopmentDocumentationListPage() {
  useTitle('Документация разработчика - Список файлов');
  const { documents } = useSelector((state) => state.documents);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDocuments({ type: 'development' })).unwrap();

    return () => dispatch(resetDocuments());
  }, [dispatch]);

  return (
    <>
      <HelmetComponent {...DOCUMENTATION_HELMET_PROPS.DEVELOPER_DOCS} />

      <DocumentsListPage
        documents={documents}
        icon={'💻'}
        title={'Техническая документация'}
        subtitle={'Архитектура системы, API reference и руководства для разработчиков'}
        sectionTitle={'Технические документы'}
        sectionDescription={'Изучите внутреннее устройство системы и API для интеграций'}
        type={'development'}
        chapterType={'разработка'}
      />
    </>
  );
}
