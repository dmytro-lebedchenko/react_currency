import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { getNormalizedDate } from '../../utils/normalizeHelper';
import { Cell } from '../Cell';
import './Table.scss';

export const Table: React.FC = () => {
  const { currency } = useAppSelector(state => state.currency);

  const [currentDate, setCurrentDate] = useState('');

  const handleSetToday = () => {
    const todayDate = new Date();
    const normalizedDate = getNormalizedDate(todayDate);

    setCurrentDate(normalizedDate);
  };

  useEffect(() => {
    handleSetToday();
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th
            className="
              table__header-cell
              table__header-cell--double"
          >
            Currency
            <br/>
            {`${currentDate}`}
          </th>

          <th className="table__header-cell">
            Buy
          </th>

          <th className="table__header-cell">
            Sale
          </th>
        </tr>
      </thead>

      <tbody>
        {currency.map(item => (
          <tr key={`${item.ccy}+${item.buy}`}>
            <td
              className="
                table__cell-item--title
                cell-item__title"
            >
              {`${item.ccy}/${item.base_ccy}`}
            </td>

            <Cell
              item={item}
              type="buy"
            />

            <Cell
              item={item}
              type="sale"
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};
