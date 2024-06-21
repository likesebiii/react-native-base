import React from 'react';
import { useBaseForwardRef, useBaseStateAndRef, useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import Page from 'templates/page/Page';
import { PageProps } from 'templates/utils';
import { NAVIGATION_CONTROLLER } from 'services/navigation';
import { BaseText } from 'components/base/base-text/BaseText';
import { View } from 'react-native';
import { colors } from '@theme';
import { CloseSvg } from '@svgs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  ACTIVE_OPACITY,
  BASE_BOTTOM_BAR_HEIGHT,
  BASE_BOTTOM_PADDING,
  randomValue,
} from '@utils';
import BattleGameWheel, {
  BattleGameWheelRef,
} from './battle-game-wheel/BattleGameWheel';
import { BasePrimaryButton } from 'components/base/base-primary-button/BasePrimaryButton';
import BattleGameCardPlaceholder from './battle-game-card-placeholder/BattleGameCardPlaceholder';

export interface BattleGamePageProps {}

const BattleGamePage: React.FC<BattleGamePageProps & PageProps> = ({}) => {
  const { styles, theme } = useBaseAspect(aspectStyle);

  const [spinRef, spinForwardRef] = useBaseForwardRef<BattleGameWheelRef>();
  const [spinning, setSpinning, spinningRef] = useBaseStateAndRef(false);

  const [placeholder, setPlaceholder] = React.useState<{
    placeholders: (number | undefined)[];
    index: number;
  }>({ placeholders: [undefined, undefined, undefined], index: -1 });

  const onClose = () => {
    NAVIGATION_CONTROLLER.close();
  };

  const onSpinPress = () => {
    const index = placeholder.index;

    if (index === 3 || spinningRef.current === true) {
      return;
    }

    setSpinning(true);

    const onFinish = () => {
      setTimeout(() => {
        setSpinning(false);
      }, 1000);
    };

    const cards = spinRef.current?.spin?.(onFinish);

    setPlaceholder((state) => {
      const array = [...state.placeholders];

      if (array[state.index] === undefined && cards) {
        const random = Math.floor(randomValue(0, 2.99));

        array[state.index] = cards[random];
      }

      return { placeholders: [...array], index: state.index + 1 };
    });
  };

  const onAchievementPress = (id: number) => {
    setPlaceholder((state) => {
      const array = [...state.placeholders];
      array[state.index] = id;

      return { placeholders: array, index: state.index };
    });
  };

  return (
    <Page style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <BaseText
          type={'jockey-24'}
          style={{ color: colors[theme].text.primary }}>
          {'PICK YOUR DECKS'}
        </BaseText>
        <TouchableOpacity activeOpacity={ACTIVE_OPACITY} onPress={onClose}>
          <CloseSvg />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 24 }}>
        <BaseText
          type={'texturina-16-regular'}
          numberOfLines={3}
          adjustsFontSizeToFit
          style={{ color: colors[theme].text.primary }}>
          {
            'Spin the wheel and pick 1 deck for each of the 3 empty slots. These are the decks you’ll both answer from.'
          }
        </BaseText>
      </View>
      <BattleGameWheel
        ref={spinForwardRef}
        onAchievementPress={onAchievementPress}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: BASE_BOTTOM_BAR_HEIGHT + 24,
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: '100%',
            alignItems: 'center',
          }}>
          <BattleGameCardPlaceholder index={placeholder.placeholders[0]} />
          <View style={{ marginHorizontal: 16 }}>
            <BattleGameCardPlaceholder index={placeholder.placeholders[1]} />
          </View>
          <BattleGameCardPlaceholder index={placeholder.placeholders[2]} />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: BASE_BOTTOM_PADDING,
          left: 0,
          right: 0,
        }}>
        <BasePrimaryButton
          state={spinning ? 'disabled' : 'enabled'}
          title={'SPIN THE WHEEL'}
          onPress={onSpinPress}
        />
      </View>
    </Page>
  );
};

export default BattleGamePage;
