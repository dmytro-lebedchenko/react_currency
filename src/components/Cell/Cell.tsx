import classNames from 'classnames';
import {
  KeyboardEvent,
  ChangeEvent,
  useEffect,
  useState,
  useRef,
} from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../app/hooks';
import { setCurrency } from '../../features/currencySlice';
import { getNormalizedCurrency } from '../../utils/normalizeHelper';
import { Currency, CurrencyType } from '../../types/Currency';
import './Cell.scss';

type Props = {
  item: Currency;
  type: CurrencyType;
};

export const Cell: React.FC<Props> = ({ item, type }) => {
  const { buy, sale } = item;

  const dispatch = useAppDispatch();

  const { currency } = useAppSelector(state => state.currency);

  const initCellValue = (type === 'buy')
    ? getNormalizedCurrency(+buy)
    : getNormalizedCurrency(+sale);

  const [isClicked, setIsClicked] = useState(false);
  const [cellValue, setCellValue] = useState(initCellValue);
  const [valid, setValid] = useState(false);

  const cellField = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value !== cellValue) {
      setCellValue(value);
    }
  };

  const handleUpdateCurrency = (type: CurrencyType) => {
    const updatedCurrency: Currency = {
      ...item,
      [type]: cellValue,
    };

    const itemToRemove = currency.findIndex(curencyItem =>
      curencyItem.ccy === updatedCurrency.ccy,
    );

    const currencyFilteredList = [...currency];

    currencyFilteredList.splice(
      itemToRemove, 1, updatedCurrency,
    );

    setCellValue(cellValue);
    dispatch(setCurrency([...currencyFilteredList]));
  }

  const handleBlur = () => {
    if (cellValue.length > 0 && +cellValue > 0) {
      handleUpdateCurrency(type);
    } else {
      setCellValue(initCellValue);
    }

    setIsClicked(false);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsClicked(false);
    };

    if (event.key === 'Enter') {
      handleBlur();
    };
  };

  const handleClose = () => {
    setIsClicked(false);
    setCellValue(initCellValue);
  };

  useEffect(() => {
    const handleValidation = () => {
      const validateIndex = +initCellValue * 0.1;
      const positiveValid = (+cellValue - +initCellValue) >= validateIndex;
      const negativeValid = (+initCellValue - +cellValue) >= validateIndex;
  
      const validateParam = positiveValid || negativeValid;
  
      return (!validateParam)
        ? setValid(false)
        : setValid(true);
    };

    handleValidation();
  }, [cellValue, initCellValue]);

  useEffect(() => {
    if (cellField.current) {
      cellField.current.focus();
    }
  }, [isClicked]);

  return (
    <td
      className={classNames(
        'cell-item',
        { 'cell-item--hover': !isClicked },
        { 'cell-item--edit': isClicked },
      )}
      onClick={() => setIsClicked(true)}
    >
      {!isClicked && (
        <>
          {getNormalizedCurrency(+cellValue)}

          <span
            className="
              cell-item__icon
              cell-item__icon--hover
              icon
              icon__pencil"
          />
        </>
      )}

      {isClicked && (
        <div
          className="cell-item__container"
          onMouseLeave={handleBlur}
        >
          <input
            type="number"
            className="cell-item__input"
            value={cellValue}
            ref={cellField}
            onChange={(event) => handleChange(event)}
            onKeyDown={(event) => handleOnKeyDown(event)}
          />

          <span
            className={classNames(
              'cell-item__icon',
              'icon__save',
              'icon',
              { 'cell-item__icon--save': valid },
              { 'cell-item__icon--save-disabled': !valid },
            )}
            onClick={handleBlur}
          />

          <span
            className="
              cell-item__icon
              cell-item__icon--close
              icon
              icon__close"
            onClick={handleClose}
          />
        </div>
      )}
    </td>
  );
};
