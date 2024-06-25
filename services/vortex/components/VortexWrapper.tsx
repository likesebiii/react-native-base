import React from 'react';
import usePersistVortex from '../hooks/usePersistVortex';

type VortexWrapperProps = {
  children: JSX.Element;
};

/**
 * This is a wrapper component that will persist the Vortex state.
 *
 * @param children - The children to render.
 * @returns The VortexWrapper component.
 *
 */
const VortexWrapper: React.FC<VortexWrapperProps> = ({ children }) => {
  usePersistVortex();

  return children;
};

export default VortexWrapper;
