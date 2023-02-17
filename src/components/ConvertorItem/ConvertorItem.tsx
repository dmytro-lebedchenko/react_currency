import {
  ChangeEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setInputFrom,
  setInputTo,
  setSelectorFrom,
  setSelectorTo,
} from '../../features/convertorSlice';
import { ConvertorType } from '../../types/ConvertorType';
import { Currency } from '../../types/Currency';
import { getNormalizedCurrency } from '../../utils/normalizeHelper';
import './ConvertorItem.scss';

type Props = {
  type: ConvertorType;
  isSwapped: boolean,
};

export const ConvertorItem: React.FC<Props> = ({ type, isSwapped }) => {
  const dispatch = useAppDispatch();

  const { currency } = useAppSelector(state => state.currency);
  const { from, to } = useAppSelector(state => state.convertor);

  const title = (type === 'change')
    ? 'Change'
    : 'Get';

  const [selected, setSelected] = useState('UAH');
  const [inputValue, setInputValue] = useState('');

  const currentInputValue = useMemo(() => {
    return (type === 'change')
      ? from.inputValue
      : to.inputValue;
  }, [type, from.inputValue, to.inputValue]);

  const uniqueCurrencyList = useMemo(() => {
    let currencyList: string[] = [];

    [...currency].map(item => currencyList.push(item.ccy, item.base_ccy));

    return currencyList.filter(
      (value, index, array) => array.indexOf(value) === index);
  }, [currency]);

  const getCurrencyItem = (currencyTitle: string) => {
    const baseCurrencyItem: Currency = {
      ccy: 'UAH',
      base_ccy: 'UAH',
      buy: '1',
      sale: '1'
    };

    return currencyTitle !== 'UAH'
      ? [...currency].filter(item => item.ccy === currencyTitle)[0]
      : baseCurrencyItem;
  }

  const getCurrencyRate = (valueFrom: Currency, valueTo: Currency) => {
    return +valueFrom.buy / +valueTo.sale;
  };

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const selectedCurrency = getCurrencyItem(value);

    setSelected(value);

    if (type === 'change') {
      dispatch(setSelectorFrom(selectedCurrency));
    }

    if (type === 'get') {
      dispatch(setSelectorTo(selectedCurrency));
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (type === 'change') {
      dispatch(setInputFrom(value));
    }

    if (type === 'get') {
      dispatch(setInputTo(value));
    }

    setInputValue(value);
  };

  const handleUpdate = () => {
    if (type === 'change') {
      const rate = getCurrencyRate(from.selectorValue, to.selectorValue);
      const valueByRate = getNormalizedCurrency(+from.inputValue * rate);

      if (!isSwapped) {
        dispatch(setInputFrom(inputValue));
      } else {
        setInputValue(to.inputValue);
        dispatch(setInputFrom(from.inputValue));
      }

      dispatch(setInputTo(valueByRate));
    }
  };

  const selectValueCondition = (type === 'change')
    ? from.selectorValue.ccy
    : to.selectorValue.ccy;

  const inputStyleCondition = (type === 'change')
    ? {cursor:'text'}
    : {cursor:'default'};

  useEffect(() => {
    handleUpdate();
  }, [
    selected,
    inputValue,
    currency,
    from.inputValue,
    to.inputValue,
    from.selectorValue.ccy,
    to.selectorValue.ccy,
    from.selectorValue.buy,
    to.selectorValue.buy,
    from.selectorValue.sale,
    to.selectorValue.sale,
  ]);

  return (
    <div className="convertor__item convertor-item">
      <div className="convertor-item__input">
        <label
          className="convertor-item__input-title"
          htmlFor={type}
        >
          {title}
        </label>

        <input
          type="number"
          className="convertor-item__input-value"
          id={type}
          name={type}
          placeholder="0,00"
          value={currentInputValue}
          style={inputStyleCondition}
          readOnly={type === 'get'}
          onChange={(event) => handleChange(event)}
        />
      </div>

      <select
        className="convertor-item__selector"
        name="select"
        value={selectValueCondition}
        onChange={(event) => handleSelect(event)}
      >
        {uniqueCurrencyList.map(item => (
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
