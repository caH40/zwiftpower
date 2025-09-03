import styles from './Price.module.css';

const services = [
  {
    id: 1,
    name: 'Организатор заездов',
    description: 'Одностраничный сайт под ключ',
    price: '2 000 ₽',
  },
  {
    id: 2,
    name: 'SEO оптимизация',
    description: 'Анализ и настройка продвижения',
    price: '8 000 ₽',
  },
  {
    id: 3,
    name: 'Поддержка',
    description: 'Техническое сопровождение 1 мес.',
    price: '5 000 ₽',
  },
];

export default function Price() {
  return (
    <ul className={styles.list}>
      {services.map((service) => (
        <li key={service.id} className={styles.item}>
          <div className={styles.info}>
            <h2 className={styles.title}>{service.name}</h2>
            <p className={styles.description}>{service.description}</p>
          </div>
          <div className={styles.price}>{service.price}</div>
        </li>
      ))}
    </ul>
  );
}
