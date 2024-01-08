import { iconsDescriptions } from '../../assets/faq';

import IconDescription from './IconDescription';
import styles from './FaqBlock.module.css';

function FaqIcons() {
  return (
    <div className={styles.block}>
      <h2 className={styles.title}>Правила в заездах</h2>
      {iconsDescriptions.map((icon) => (
        <IconDescription key={icon.id} Icon={icon.icon}>
          {icon.description}
        </IconDescription>
      ))}
    </div>
  );
}

export default FaqIcons;
