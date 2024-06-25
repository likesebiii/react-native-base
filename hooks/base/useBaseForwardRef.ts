import React from 'react';

const useBaseForwardRef = <T>(): [
  React.MutableRefObject<T | undefined>,
  React.ForwardedRef<T>,
] => {
  const ref = React.useRef<T>();

  const forwardRef: React.ForwardedRef<T> = React.useCallback(
    (instance: T | null) => {
      if (!!instance) {
        ref.current = instance;
      }
    },
    [],
  );

  return [ref, forwardRef];
};

export default useBaseForwardRef;
