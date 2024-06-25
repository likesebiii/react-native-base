import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import useBaseMounted from './useBaseMounted';

const useStateAndRef = <T>(
  initialState?: T,
): [T, Dispatch<SetStateAction<T>>, React.MutableRefObject<T>] => {
  const [state, setState] = useState(initialState);
  const ref = useRef(initialState);

  const { mounted } = useBaseMounted();

  const changeState = useCallback(
    (newState: T | undefined) => {
      if (mounted.current) {
        const result =
          typeof newState === 'function' ? newState(ref.current) : newState;

        ref.current = result;
        setState(result);
      }
    },
    [state],
  );

  return [state, changeState, ref] as never;
};

export default useStateAndRef;
