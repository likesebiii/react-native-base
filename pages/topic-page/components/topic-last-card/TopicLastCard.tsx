import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BaseText } from 'components/base/base-text/BaseText';
import TopicContentCardMargins from '../topic-content-card-margins/TopicContentCardMargins';
import { getCardHeight } from 'pages/topic-page/constants';
import { CardsSvg, RetrySvg, UpgradeSvg } from '@svgs';
import {
  getAchievementCard,
  TopicCardContentType,
  TopicContentKeyType,
} from '@utils';
import { useTopicCardLeftCards } from '../topic-card/hooks/useTopicCardLeftCards';
import { useTopicContext } from 'pages/topic-page/context/useTopicContext';
import { NUMBER_OF_CARDS } from 'pages/topic-page/context/TopicProvider';
import { SharedValue, runOnJS, useDerivedValue } from 'react-native-reanimated';
import { TOPIC_PAGE_FOOTER_CONTROLLER } from '../topic-page-footer/TopicPageFooter';
import BaseDivider from 'components/base/base-divider/BaseDivider';

interface TopicLastCardProps {
  topic?: string;
  fullContent: TopicCardContentType[];
  zIndex: SharedValue<number>;
  setAnswerable: () => void;
  type?: TopicContentKeyType;
}

const TopicLastCard: React.FC<TopicLastCardProps> = ({
  topic,
  fullContent,
  zIndex,
  setAnswerable,
  type,
}) => {
  const { styles, screenHeight } = useBaseAspect(aspectStyle);

  const { cardZIndex } = useTopicContext();

  const contentHeight = getCardHeight(screenHeight);

  const achievement = React.useMemo(() => {
    return type ? getAchievementCard({ topic: type }) : undefined;
  }, [type]);

  const availableNextDifficulty = achievement
    ? achievement.cardsCount !== 0
      ? achievement.difficulty + 1
      : -1
    : -1;

  const { earnedQuestions, leftQuestions } = useTopicCardLeftCards({
    fullContent,
  });

  const displayBottomBar = () => {
    if (availableNextDifficulty !== -1) {
      TOPIC_PAGE_FOOTER_CONTROLLER.display?.(true);
    }
  };

  const onFocus = () => {
    if (availableNextDifficulty !== -1) {
      displayBottomBar();
      setAnswerable();
    }
  };

  useDerivedValue(() => {
    if (cardZIndex.value + NUMBER_OF_CARDS - 1 === zIndex.value) {
      runOnJS(onFocus)();
    }
  });

  return (
    <>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <BaseText
            style={styles.title}
            type={'texturina-24-semi-bold'}
            adjustsFontSizeToFit
            maxFontSizeMultiplier={1}>
            {'Deck Finished'}
          </BaseText>
          <View
            style={{
              marginTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CardsSvg />
            <BaseText style={styles.subtitle} type={'texturina-16-regular'}>
              <BaseText style={styles.subtitle} type={'texturina-18-bold'}>
                {'x'}
              </BaseText>
              <BaseText style={styles.subtitle} type={'texturina-34-semi-bold'}>
                {earnedQuestions}
              </BaseText>
              {` card${earnedQuestions === 1 ? '' : 's'} earned`}
            </BaseText>
          </View>
          {leftQuestions !== 0 ? (
            <View
              style={{
                marginTop: -24,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <CardsSvg fillFirst={'#A73E3E'} fillSecond={'#C24848'} />
              <BaseText style={styles.subtitle} type={'texturina-16-regular'}>
                <BaseText
                  style={styles.subtitle}
                  type={'texturina-18-bold'}
                  maxFontSizeMultiplier={1}>
                  {'x'}
                </BaseText>
                <BaseText
                  style={styles.subtitle}
                  type={'texturina-34-semi-bold'}>
                  {leftQuestions}
                </BaseText>
                {` card${leftQuestions === 1 ? '' : 's'} left`}
              </BaseText>
            </View>
          ) : undefined}
          <View style={{ width: '100%' }}>
            <BaseDivider />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginTop: 8,
              }}>
              {leftQuestions === 0 ? (
                availableNextDifficulty !== -1 ? (
                  <View style={{ position: 'absolute', left: -8, top: 10 }}>
                    <UpgradeSvg width={24} height={24} />
                  </View>
                ) : undefined
              ) : (
                <View style={{ position: 'absolute', left: -8, top: 10 }}>
                  <RetrySvg />
                </View>
              )}
              <View style={{ paddingLeft: 16, paddingRight: 16 }}>
                <BaseText
                  style={styles.subtitle}
                  type={'texturina-16-regular'}
                  maxFontSizeMultiplier={1}>
                  {leftQuestions === 0 ? (
                    availableNextDifficulty !== -1 ? (
                      <>
                        <BaseText
                          style={styles.subtitle}
                          type={'texturina-16-semi-bold'}>
                          {'Upgrade'}
                        </BaseText>
                        {` to the next level\nor\n`}
                      </>
                    ) : undefined
                  ) : (
                    <>
                      <BaseText
                        style={styles.subtitle}
                        type={'texturina-16-semi-bold'}>
                        {'Revisit'}
                      </BaseText>
                      {' the ones you missed to get them all \nor\n'}
                    </>
                  )}
                  <BaseText
                    style={styles.subtitle}
                    type={'texturina-16-semi-bold'}>
                    {'Continue'}
                  </BaseText>
                  <BaseText
                    style={styles.subtitle}
                    type={'texturina-16-regular'}>
                    {' with a new one.'}
                  </BaseText>
                </BaseText>
              </View>
            </View>
          </View>
        </View>
        <TopicContentCardMargins contentHeight={contentHeight} topic={topic} />
      </View>
    </>
  );
};

export default TopicLastCard;
