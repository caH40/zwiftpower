import classNames from 'classnames/bind';

import styles from '../Table.module.css';

import { logsAdminsColumns } from './column-titles';

const cx = classNames.bind(styles);

function Thead({ lg, sm }) {
  return (
    <thead>
      <tr>
        {logsAdminsColumns(lg, sm).map((column, index) => (
          <th className={cx({ clear: index === 0 })} key={column.id}>
            {column.name}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
