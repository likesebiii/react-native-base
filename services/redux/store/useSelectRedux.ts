import React from 'react';
import { useSelector } from 'react-redux';
import REDUX_STORE_CONTEXTS, {
  ReduxStoreContextMapperType,
  ReduxStoreContextType,
} from './store.utils';

type Parameters<T extends ((...args: any) => any) | any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
type ReturnType<T extends ((...args: any) => any) | any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;

const useSelectRedux = <
  RKey extends ReduxStoreContextType,
  RSelectorKey extends keyof ReduxStoreContextMapperType[RKey]['selectors'],
  RSelector = ReduxStoreContextMapperType[RKey]['selectors'][RSelectorKey],
>(
  key: RKey,
  selectorKey: RSelectorKey,
  ...props: Parameters<RSelector>
): ReturnType<ReturnType<RSelector>> => {
  const selector = React.useMemo(
    () => REDUX_STORE_CONTEXTS[key]['selectors'][selectorKey as never] as any,
    [],
  );

  return useSelector(selector?.(...props));
};

export default useSelectRedux;
