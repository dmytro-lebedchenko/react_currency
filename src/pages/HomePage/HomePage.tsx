import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
  useLocalStorage,
} from "../../app/hooks";
import { Convertor } from "../../components/Convertor";
import { ErrorNotification } from "../../components/ErrorNotification";
import { Loader } from "../../components/Loader";
import { Table } from "../../components/Table";
import { currencyInit } from "../../features/currencySlice";

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    currency,
    hasError,
    loaded,
  } = useAppSelector(state => state.currency);

  const [counterError, setCounterError] = useState(false);

  const currentCounter = +JSON.parse(localStorage.getItem('counter') || `0`);
  const [setCounter] = useLocalStorage('counter', currentCounter);

  const handleLoadCurrency = () => {
    if (currentCounter === 4) {
      setCounterError(true);
      setCounter(0);
    } else {
      setCounter(prev => prev + 1);
    }

    dispatch(currencyInit());
  };

  useEffect(() => {
    handleLoadCurrency();
  }, []);

  return (
    <main>
      <div className="container">
        {counterError && (
          <ErrorNotification
            error="Oh, no! Server error"
          />
        )}

        {hasError && (
          <ErrorNotification
            error="Error during loading currency data"
          />
        )}

        {!loaded && <Loader />}

        {currency.length > 0
          && !counterError
          && !hasError
          && loaded
          && (
            <>
              <Table />

              <Convertor />
            </>
          )}
      </div>
    </main>
  );
}
