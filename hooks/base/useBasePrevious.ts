import React from 'react';

const useBasePrevious = <T extends any>(value: T) => {
  const ref = React.useRef<T | undefined>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default useBasePrevious;
