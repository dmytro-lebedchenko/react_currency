import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setConvertorSwap } from '../../features/convertorSlice';
import { ConvertorItem } from '../ConvertorItem';
import './Convertor.scss';

export const Convertor: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isClicked, setIsClicked] = useState(false);

  const buttonRotateCondition = isClicked
    ? 'rotate(180deg)'
    : 'rotate(0deg)';

  const handleClick = () => {
    setIsClicked(!isClicked);
    dispatch(setConvertorSwap());
  };

  return (
    <div className="convertor">
      <ConvertorItem
        type="change"
        isSwapped={isClicked}
      />

      <button
        type="button"
        className="
          convertor__button
          icon
          icon__swap"
          style={{
            transform: buttonRotateCondition,
          }}
        onClick={handleClick}
      />

      <ConvertorItem
        type="get"
        isSwapped={isClicked}
      />
    </div>
  );
};
