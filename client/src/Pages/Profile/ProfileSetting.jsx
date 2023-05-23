import React, { useState } from 'react';

import SimpleInput from '../../components/UI/SimpleInput/SimpleInput';
import Button from '../../components/UI/Button/Button';
import { getZwiftRider } from '../../api/zwift/rider';
import LogoRider from '../../components/LogoRider/LogoRider';

import styles from './Profile.module.css';

function ProfileSetting() {
  const [form, setForm] = useState({ zwiftId: 0 });
  const [rider, setRider] = useState({});

  const findRider = () => {
    getZwiftRider(form.zwiftId).then((response) => setRider(response.data));
  };

  return (
    <section className={styles.wrapper}>
      <form className={styles.block__zwiftId}>
        <div className={styles.box__zwiftId}>
          <SimpleInput
            name={'Zwift Id'}
            state={form}
            setState={setForm}
            property="zwiftId"
            type="number"
          />
          <Button getClick={findRider}>НАЙТИ</Button>
        </div>

        {rider.id && (
          <>
            <div className={styles.box__rider}>
              <div className={styles.box__img}>
                <LogoRider
                  source={rider.imageSrc}
                  firstName={rider.firstName}
                  lastName={rider.lastName}
                />
              </div>
              <div className={styles.box__name}>
                <span>{rider.firstName}</span>
                <span>{rider.lastName}</span>
              </div>
            </div>
            <Button getClick={findRider}>СОХРАНИТЬ</Button>
          </>
        )}
      </form>
    </section>
  );
}

export default ProfileSetting;
