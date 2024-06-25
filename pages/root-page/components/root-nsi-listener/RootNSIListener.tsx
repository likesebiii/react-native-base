import React from 'react';
import { useSelectRedux, useSelectVortex, Vortex } from '@services';

interface RootNSIListenerProps {}

const RootNSIListener: React.FC<RootNSIListenerProps> = ({}) => {
  const isNSI = useSelectVortex('user-vortex', 'selectIsNSI');
  const { email } = useSelectRedux('current', 'currentUser', 'email');

  React.useEffect(() => {
    if (isNSI && email) {
      setTimeout(() => {
        Vortex.dispatch('user-vortex', 'setNSIState')(false);
      }, 500);
    }
  }, [isNSI, email]);

  return null;
};

export default RootNSIListener;
