import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CallbackVKID() {
  const navigate = useNavigate();

  useEffect(() => {
    // Логика обработки callback
    // После завершения обработки выполняем редирект
    navigate('/');
  }, [navigate]);

  return null; //
}
