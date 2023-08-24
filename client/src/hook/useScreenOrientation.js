import { useState, useEffect } from 'react';

const getOrientation = () => window.screen?.orientation?.type;

const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState(getOrientation());

  const updateOrientation = () => {
    setOrientation(getOrientation());
  };

  useEffect(() => {
    window.addEventListener('resize', updateOrientation);
    return () => {
      window.removeEventListener('resize', updateOrientation);
    };
  }, []);

  return { isPortrait: orientation.includes('portrait') };
};

export default useScreenOrientation;
