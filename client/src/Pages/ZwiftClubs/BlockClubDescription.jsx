import classNames from 'classnames/bind';

import Button from '../../components/UI/Button/Button';
import JSONBlock from '../../components/JSONBlock/JSONBlock';
import SimpleSelect from '../../components/UI/SimpleSelect/SimpleSelect';

import styles from './ZwiftClubs.module.css';

const cx = classNames.bind(styles);

/**
 * Блок описания запрошенного клуба с ZwiftAPI
 */
function BlockClubDescription({ club, postClub, organizers, organizer, setOrganizer }) {
  const organizersOptions = organizers.map((org) => ({
    id: org.label,
    value: org.name,
    name: org.name,
  }));

  return (
    <>
      <h2 className={styles.title}>Данные запрошенного клуба</h2>
      <div className={styles.group}>
        <dl>
          <div className={styles.box__list}>
            <dt className={styles.term}>Id клуба</dt>
            <dd className={styles.description}>{club.id}</dd>
          </div>

          <div className={styles.box__list}>
            <dt className={styles.term}>name</dt>
            <dd className={styles.description}>{club.name}</dd>
          </div>

          <div className={styles.box__list}>
            <dt className={styles.term}>tagline</dt>
            <dd className={styles.description}>{club.tagline}</dd>
          </div>

          <div className={styles.box__list}>
            <dt className={styles.term}>description</dt>
            <dd className={styles.description}>{club.description}</dd>
          </div>

          <div className={styles.box__list}>
            <dt className={styles.term}>icon</dt>
            <dd className={cx('description', 'box__image')}>
              <img
                className={styles.image}
                src={club.images.find((image) => image.type === 'ICON')?.imageUrl}
                alt="Icon club"
              />
            </dd>
          </div>
        </dl>
        <div className={styles.box__select}>
          <SimpleSelect
            name={'Организатор заездов для клуба'}
            state={organizer}
            setState={setOrganizer}
            options={organizersOptions}
            property="org"
          />
        </div>
        <div className={styles.align__right}>
          <Button getClick={() => postClub(club)} disabled={!organizer.org}>
            Добавить
          </Button>
        </div>
      </div>
      <JSONBlock json={club} />
    </>
  );
}

export default BlockClubDescription;
