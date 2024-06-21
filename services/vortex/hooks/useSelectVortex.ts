import { EMPTY_FUNCTION } from '@utils';
import React from 'react';
import type {
  VortexContextPropsMapper,
  VortexContextType,
} from '../contexts/global';
import isEqual from 'react-fast-compare';
import Vortex from '../utils/vortex';

const EMPTY_VORTEX_OBJECT = {
  context: { object: {} },
  addListener: () => ({ remove: EMPTY_FUNCTION }),
};

type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never;
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

const useSelectVortex = <
  VKey extends VortexContextType,
  VSelectorKey extends keyof VortexContextPropsMapper[VKey]['selectors'],
  VSelectorReturned = ReturnType<
    VortexContextPropsMapper[VKey]['selectors'][VSelectorKey]
  >,
  VSelected = VSelectorReturned,
  VObject = VortexContextPropsMapper[VKey]['type'],
  VSelector = VortexContextPropsMapper[VKey]['selectors'][VSelectorKey],
>(
  key: VKey,
  selector: ((item: VObject) => VSelected) | VSelectorKey,
  ...params: Parameters<OmitFirstArg<VSelector>>
): VSelected => {
  const { context, addListener } = Vortex.contexts[key] ?? EMPTY_VORTEX_OBJECT;

  const objectRef = React.useRef<VObject>(context.object);

  const [selectedObject, setSelectedObject] = React.useState(
    typeof selector === 'function'
      ? selector(context.object)
      : Vortex.select(key, selector, context.object, ...params),
  );
  const selectedObjectRef = React.useRef(selectedObject);

  const changeObject = React.useCallback((object: any) => {
    objectRef.current = { ...object };

    const selected =
      typeof selector === 'function'
        ? selector(object)
        : Vortex.select(key, selector, object, ...params);

    if (
      selected !== selectedObjectRef.current &&
      !isEqual(selected, selectedObjectRef.current)
    ) {
      selectedObjectRef.current = selected;
      setSelectedObject(selected);
    }
  }, []);

  React.useEffect(() => {
    const listener = addListener?.(changeObject);

    return listener?.remove;
  }, []);

  return selectedObject as VSelected;
};

export default useSelectVortex;
