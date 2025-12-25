import MyTooltip from '../../HOC/MyTooltip';

import { AdaptiveImage } from '../AdaptiveImage/AdaptiveImage';

export default function SimpleLogo({ name, sources, squareSize = 28 }) {
  return (
    <MyTooltip tooltip={name}>
      <div>
        <AdaptiveImage
          height={squareSize}
          width={squareSize}
          sources={sources}
          fallbackSrc={'/images/transparent.png'}
        />
      </div>
    </MyTooltip>
  );
}
