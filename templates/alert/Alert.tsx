import React from 'react';
import { View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { useBaseAspect, useBaseBackPress } from '@hooks';
import { aspectStyle } from './aspect';
import { PageProps } from '../utils';
import { FunctionalComponent } from '@types';
import { componentWithStyle } from '@utils';

type AlertProps = {
  header?: JSX.Element;
  footer?: JSX.Element;
  onClose?: () => void;
};

const Alert: FunctionalComponent<AlertProps & PageProps> = ({
  header,
  footer,
  children,
  onClose,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  useBaseBackPress(onClose, []);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.background}>
          <TouchableWithoutFeedback style={styles.flexContainer}>
            <View style={styles.content}>
              <View style={styles.modal}>
                {componentWithStyle(header, styles.header)}
                <ScrollView
                  style={styles.list}
                  showsVerticalScrollIndicator={false}>
                  {children}
                </ScrollView>
                {componentWithStyle(footer, styles.footer)}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Alert;
