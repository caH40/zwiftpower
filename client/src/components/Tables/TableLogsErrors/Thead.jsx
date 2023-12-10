import classNames from 'classnames/bind';

import styles from '../Table.module.css';

import { logsErrorsColumns } from './column-titles';

const cx = classNames.bind(styles);

function Thead() {
  return (
    <thead>
      <tr>
        {logsErrorsColumns().map((column, index) => (
          <th className={cx({ clear: index === 0 })} key={column.id}>
            {column.name}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Thead;
