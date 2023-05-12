import { useResize } from '../hooks/use-resize';

export const Adaptive = ({ children, sizeScreen, visible }) => {
  const sizesScreen = useResize();
  const sizes = {
    sm: sizesScreen.isScreenSm,
    md: sizesScreen.isScreenMd,
    lg: sizesScreen.isScreenLg,
    xl: sizesScreen.isScreenXl,
    xxl: sizesScreen.isScreenXxl,
  };
  // если необходимо показывать элемент visible=true
  const showElement = visible ? !sizes[sizeScreen] : sizes[sizeScreen];
  return showElement ? children : '';
};
