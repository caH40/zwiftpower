import { useState } from 'react';

import { jerseys as jerseysFromAPI } from '../../assets/zwift/raw/jerseys';

import styles from './FaqJersey.module.css';

const jerseysFromAPISorted = jerseysFromAPI
  .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
  .map((jersey, index) => ({ ...jersey, index: index + 1 }));

const jerseyFirst = {
  id: 3275729930,
  name: '100km',
  imageUrl: 'https://cdn.zwift.com/static/zc/JERSEYS/Zwift_MetricCentury_Jersey_thumb.png',
  index: 0,
};

// Просмотр Jersey которые можно выбрать в Звифте
const FaqJersey = () => {
  const [jersey, setJersey] = useState(jerseyFirst);
  const [search, setSearch] = useState('');

  const filterJerseys = () => {
    return [...jerseysFromAPISorted].filter((jersey) =>
      jersey.name.toLowerCase().includes(search.toLowerCase())
    );
  };
  return (
    <div className={styles.block}>
      <h3 className={styles.title}>Поиск джерси в Zwift</h3>
      <div className={styles.box__jersey}>
        <img className={styles.image} src={jersey.imageUrl} alt={jersey.name} />
      </div>

      <nav className={styles.nav}>
        <label className={styles.label}>Фильтр</label>
        <input
          className={styles.input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <label className={styles.label}>Выбор</label>
        <select
          className={styles.select}
          onChange={(e) =>
            setJersey(jerseysFromAPISorted.find((elm) => elm.name === e.target.value))
          }
        >
          {/* <option value={''} label={' '}></option> */}
          {filterJerseys().map((jersey, index) => (
            <option
              className={styles.option}
              value={jersey.name}
              label={`${index + 1}. ${jersey.name}`}
              key={jersey.index}
            ></option>
          ))}
        </select>
      </nav>

      {/* {filterJerseys().map((jersey, index) => (
        <div className={styles.box__jersey} key={index}>
          <span>{jersey.name}</span>
          <img className={styles.image} src={jersey.imageUrl} alt={jersey.name} />
        </div>
      ))} */}
    </div>
  );
};

export default FaqJersey;
