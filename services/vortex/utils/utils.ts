import { VortexContextType } from '../contexts/global';
import { VortexCustomStorage } from './storage';

export type VortexListener<V = any> = (object: V) => void;

export type VortexContext<VObject> = {
  object: VObject;
  listeners: VortexListener<VObject>[];
};

type VortexChangeType<VObject> = (
  param: VObject | ((object: VObject) => VObject),
) => void;
type VortexListenerType<VObject> = (listener: VortexListener<VObject>) => {
  remove: () => void;
};

export type VortexCustomContext<VObject = any> = {
  context: VortexContext<VObject>;
  addListener: VortexListenerType<VObject>;
  changeObject: VortexChangeType<VObject>;
  persistoid: {
    blacklist?: (keyof VObject)[];
  };
};

export const vortexUpdateObject = <VObject = any>({
  previous,
  current,
}: {
  previous: VObject;
  current?: VObject;
}): VObject => {
  if (typeof previous !== 'object' || !previous) {
    return previous ?? (typeof current === 'object' ? current : previous);
  }

  const finalObject = current ?? ((Array.isArray(previous) ? [] : {}) as any);

  Object.entries(previous).forEach(([key, value]) => {
    finalObject[key] = vortexUpdateObject({
      previous: value,
      current: finalObject[key],
    });
  });

  return finalObject;
};

type VortexCreateType = <VObject>({
  key,
  blacklist,
  initial,
}: {
  key: VortexContextType;
  blacklist?: (keyof VObject)[] | undefined;
  initial: VObject;
}) => VortexCustomContext<VObject>;

export const createVortex: VortexCreateType = <VObject>({
  key,
  blacklist,
  initial,
}: {
  key: VortexContextType;
  blacklist?: (keyof VObject)[];
  initial: VObject;
}): VortexCustomContext<VObject> => {
  const context: VortexContext<VObject> = {
    object: initial,
    listeners: [],
  };
  const persistoid: {
    blacklist?: (keyof VObject)[];
  } = { blacklist };

  context.object = retrieveVortexContext(context.object, key);

  const addListener = (listener: VortexListener<VObject>) => {
    context.listeners.push(listener);

    return {
      remove: () => {
        context.listeners = context.listeners.filter(
          (contextListener) => listener !== contextListener,
        );
      },
    };
  };

  const changeObject = (param: VObject | ((object: VObject) => VObject)) => {
    const newObject: VObject =
      param instanceof Function ? param(context.object) : param;

    context.object = newObject;

    context.listeners.forEach((listener) => {
      listener(newObject);
    });
  };

  const customContext: VortexCustomContext = {
    context,
    addListener,
    changeObject,
    persistoid,
  };

  return customContext;
};

export const retrieveVortexContext = <VContext>(
  vortexContext: VContext,
  key: string,
) => {
  const vortexObject = VortexCustomStorage.getString(key);

  if (vortexObject) {
    const object = JSON.parse(vortexObject);
    const current = vortexUpdateObject({
      previous: vortexContext,
    });

    return vortexUpdateObject({
      previous: object,
      current: current,
    });
  } else {
    return vortexContext;
  }
};
