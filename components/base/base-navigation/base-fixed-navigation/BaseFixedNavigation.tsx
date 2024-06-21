import { useBaseAspect } from '@hooks';
import React from 'react';
import { View, TouchableOpacity, Insets } from 'react-native';
import { NavigationProps } from 'templates/utils';
import { aspectStyle } from './aspect';
import { BaseText } from 'components/base/base-text/BaseText';
import { ACTIVE_OPACITY } from '@utils';
import { CloseArrowSvg } from '@svgs';

export type BaseFixedNavigationProps = NavigationProps & {};

const HIT_SLOP: Insets = {
  left: 18,
  top: 18,
  bottom: 18,
  right: 18,
};

const BaseFixedNavigation: React.FC<BaseFixedNavigationProps> = ({
  title,
  titleComponent,
  rightComponent,
  onClose,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  return (
    <View style={styles.container} pointerEvents={'box-none'}>
      <View style={styles.mainContainer} pointerEvents={'box-none'}>
        <View style={styles.button} pointerEvents={'box-none'}>
          <TouchableOpacity
            activeOpacity={ACTIVE_OPACITY}
            onPress={onClose}
            hitSlop={HIT_SLOP}>
            <CloseArrowSvg height={22} width={22} />
          </TouchableOpacity>
        </View>
        {title || titleComponent
          ? titleComponent ?? (
              <BaseText
                type={'texturina-24-semi-bold'}
                numberOfLines={1}
                style={styles.title}>
                {title}
              </BaseText>
            )
          : undefined}
        {rightComponent ? (
          <View style={styles.right} pointerEvents={'box-none'}>
            {rightComponent}
          </View>
        ) : undefined}
      </View>
    </View>
  );
};

export default BaseFixedNavigation;
