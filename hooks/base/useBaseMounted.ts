import React from 'react';

const useBaseMounted = () => {
  const mounted = React.useRef(true);

  React.useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  return { mounted };
};

export default useBaseMounted;
