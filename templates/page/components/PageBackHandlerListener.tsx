import { useBaseBackPress } from '@hooks';
import React from 'react';

type PageBackHandlerListenerProps = {
  onClose?: () => void;
};

const PageBackHandlerListener: React.FC<PageBackHandlerListenerProps> = ({
  onClose,
}) => {
  useBaseBackPress(onClose, []);

  return null;
};

export default PageBackHandlerListener;
