import React from 'react';
import useBaseStateAndRef from './useBaseStateAndRef';
import { Dimensions } from '@services';

const useBaseDimensions = ({ update = true }: { update?: boolean }) => {
  const [dimensions, setDimensions, dimensionsRef] = useBaseStateAndRef({
    height: Dimensions.get('height'),
    width: Dimensions.get('width'),
  });

  const onDimensionChange = React.useCallback(
    (height: number, width: number) => {
      if (update) {
        if (
          height !== dimensionsRef.current.height ||
          width !== dimensionsRef.current.width
        ) {
          setDimensions({ height, width });
        }
      }
    },
    [],
  );

  React.useEffect(() => {
    const listener = Dimensions?.addListener?.(onDimensionChange);

    return listener.remove;
  }, []);

  return dimensions;
};

export default useBaseDimensions;
