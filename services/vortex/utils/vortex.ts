import type {
  VortexContextPropsMapper,
  VortexContextType,
} from '../contexts/global';
import { VortexContexts } from '../contexts/global';
import { VortexCustomStorage } from './storage';
import type { VortexCustomContext } from './utils';
import { createVortex } from './utils';

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

const Vortex: {
  contexts: Record<VortexContextType, VortexCustomContext>;
  getObject: <V extends VortexContextType>(
    key: V,
  ) => VortexContextPropsMapper[V]['type'];
  changeObject: <V extends VortexContextType>(
    key: V,
    changeObject:
      | VortexContextPropsMapper[V]['type']
      | ((
          object: VortexContextPropsMapper[V]['type'],
        ) => VortexContextPropsMapper[V]['type']),
  ) => void;
  select: <
    VKey extends VortexContextType,
    VSelectorKey extends keyof VortexContextPropsMapper[VKey]['selectors'],
    VSelector = VortexContextPropsMapper[VKey]['selectors'][VSelectorKey],
  >(
    key: VKey,
    selectorKey: VSelectorKey,
    vortexObject?: VortexContextPropsMapper[VKey]['type'],
    ...params: Parameters<OmitFirstArg<VSelector>>
  ) => ReturnType<VortexContextPropsMapper[VKey]['selectors'][VSelectorKey]>;
  dispatch: <
    VKey extends VortexContextType,
    VActionType extends keyof VortexContextPropsMapper[VKey]['actions'],
  >(
    key: VKey,
    actionKey: VActionType,
  ) => VortexContextPropsMapper[VKey]['actions'][VActionType];
  persist: () => void;
} = {
  contexts: Object.keys(VortexContexts).reduce((prev, keyFromProps) => {
    const key = keyFromProps as VortexContextType;
    const vortexContext = createVortex<
      VortexContextPropsMapper[typeof key]['type']
    >({
      key: key,
      ...VortexContexts[key],
    });

    prev[key] = vortexContext;

    return prev;
  }, {} as Record<VortexContextType, VortexCustomContext>),
  getObject: (key) => {
    return Vortex.contexts[key].context.object;
  },
  changeObject: (key, change) => {
    const { changeObject } = Vortex.contexts[key];

    changeObject(change);
  },
  select: (key, selectorKey, vortexObject, ...params) => {
    const selector =
      VortexContexts[key].selectors[selectorKey] ??
      (((vortex: VortexContextPropsMapper[typeof key]['type']) =>
        vortex) as any);

    if (vortexObject) {
      return selector?.(vortexObject, ...params);
    } else {
      const vortexObject = Vortex.getObject(key);

      return selector?.(vortexObject, ...params);
    }
  },
  dispatch: (key, actionKey) => {
    return VortexContexts[key].actions[actionKey];
  },
  persist: () => {
    Object.keys(Vortex.contexts).forEach((keyFromProps) => {
      const key = keyFromProps as VortexContextType;
      const context = Vortex.contexts[key];

      if (context) {
        const { blacklist } = context.persistoid;
        const object = context.context.object;
        const persistoid = { keys: Object.keys(object) };

        persistoid.keys = persistoid.keys.filter(
          (key) => !blacklist?.includes(key),
        );

        const newObject: Partial<
          Pick<typeof object, (typeof persistoid)['keys'][number]>
        > = {};

        persistoid.keys.forEach((key) => {
          newObject[key] =
            typeof object[key] === 'object' ? { ...object[key] } : object[key];
        });

        const persistedVortexObject = JSON.stringify(newObject);
        VortexCustomStorage.set(key, persistedVortexObject);
      }
    });
  },
};

export default Vortex;
