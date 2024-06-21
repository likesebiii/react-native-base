import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BaseToast, ToastProps } from 'react-native-toast-message';
import { TOASTS_TEXT_1_PROPS, TOASTS_TEXT_2_PROPS } from '@utils';

type SuccessToastProps = ToastProps & {};

const SuccessToast: React.FC<SuccessToastProps> = (props) => {
  const { styles } = useBaseAspect(aspectStyle);

  return (
    <BaseToast
      {...props}
      style={styles.container}
      contentContainerStyle={styles.content}
      text1Style={styles.title}
      text2Style={styles.subtitle}
      text1Props={TOASTS_TEXT_1_PROPS}
      text2Props={TOASTS_TEXT_2_PROPS}
    />
  );
};

export default SuccessToast;
