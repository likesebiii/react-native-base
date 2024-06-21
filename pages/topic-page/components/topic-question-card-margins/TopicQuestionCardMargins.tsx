import React from 'react';
import { View, Text, Platform } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BaseText } from 'components/base/base-text/BaseText';
import { CardBackBlueSvg, CardBackSvg, CardMarginSvg } from '@svgs';
import { useTopicContext } from 'pages/topic-page/context/useTopicContext';
import {
  MAX_TEXT_SIZE_MULTIPLIER,
  TopicContentDifficultyType,
  reverseString,
  scaleFontSizeToPixelRatioAndroid,
} from '@utils';
import { interpolate } from 'react-native-reanimated';

type TopicQuestionCardMarginsProps = {
  contentHeight: number;
  disableBack?: boolean;
  backgroundColor?: string;
  cardBackType?: 'normal' | 'blue';
  topic?: string;
  difficulty?: TopicContentDifficultyType;
};

const TopicQuestionCardMargins: React.FC<TopicQuestionCardMarginsProps> = ({
  contentHeight,
  disableBack,
  backgroundColor = '#C2A984',
  cardBackType = 'normal',
  topic: topicFromProps,
  difficulty: difficultyFromProps,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const { topic: topicFromContext, difficulty: difficultyFromContext } =
    useTopicContext();
  const topic = topicFromProps ?? topicFromContext;
  const difficulty = difficultyFromProps ?? difficultyFromContext;
  const difficultyString = `LEVEL ${difficulty}`;

  const CardBack = cardBackType === 'normal' ? CardBackSvg : CardBackBlueSvg;

  const fontSize = interpolate(contentHeight, [100, 420], [6, 18]);
  const lineHeight = interpolate(contentHeight, [100, 420], [10, 22]);

  const fontSizeDifficulty = interpolate(contentHeight, [100, 420], [4, 14]);
  const lineHeightDifficulty = interpolate(contentHeight, [100, 420], [4, 14]);

  return (
    <View style={styles.margin}>
      {topic.trim() === '' ? null : (
        <View
          style={[
            styles.topTopicContainer,
            {
              top: interpolate(contentHeight, [100, 420], [-1.5, 5]),
            },
          ]}>
          <View
            style={[
              styles.topTopic,
              {
                backgroundColor,
                paddingHorizontal: interpolate(
                  contentHeight,
                  [100, 420],
                  [2, 5],
                ),
              },
            ]}>
            <Text
              style={[
                {
                  fontFamily: 'JockeyOne-Regular',
                  fontSize:
                    Platform.OS === 'android'
                      ? scaleFontSizeToPixelRatioAndroid(fontSize)
                      : fontSize,
                  lineHeight:
                    Platform.OS === 'android'
                      ? scaleFontSizeToPixelRatioAndroid(lineHeight)
                      : lineHeight,
                },
                styles.topicText,
              ]}
              maxFontSizeMultiplier={MAX_TEXT_SIZE_MULTIPLIER}>
              {topic}
            </Text>
          </View>
        </View>
      )}
      {topic.trim() === '' ? null : (
        <View
          style={[
            styles.bottomTopicContainer,
            {
              bottom: interpolate(contentHeight, [100, 420], [-1.5, 5]),
            },
          ]}>
          <View
            style={[
              styles.topTopic,
              {
                backgroundColor,
                paddingHorizontal: interpolate(
                  contentHeight,
                  [100, 420],
                  [2, 5],
                ),
              },
            ]}>
            <BaseText
              type={'texturina-16-semi-bold'}
              style={[
                {
                  fontFamily: 'JockeyOne-Regular',
                  fontSize:
                    Platform.OS === 'android'
                      ? scaleFontSizeToPixelRatioAndroid(fontSize)
                      : fontSize,
                  lineHeight:
                    Platform.OS === 'android'
                      ? scaleFontSizeToPixelRatioAndroid(lineHeight)
                      : lineHeight,
                },
                styles.topicText,
              ]}>
              {topic}
            </BaseText>
          </View>
        </View>
      )}
      <View
        style={[
          styles.topLeftDifficulty,
          {
            left: interpolate(contentHeight, [100, 420], [3.6, 13.5]),
            top: interpolate(contentHeight, [100, 420], [14, 42]),
          },
        ]}>
        <View
          style={[
            styles.leftDifficulty,
            {
              backgroundColor,
              paddingVertical: interpolate(contentHeight, [100, 420], [2, 5]),
            },
          ]}>
          {reverseString(difficultyString)
            .split('')
            .map((char: string, index: number) => (
              <Text
                style={[
                  styles.topicText,
                  {
                    transform: [{ rotate: '-90deg' }],
                    fontFamily: 'JockeyOne-Regular',
                    marginTop: interpolate(
                      contentHeight,
                      [100, 420],
                      [-0.5, -3.5],
                    ),
                    marginBottom: interpolate(
                      contentHeight,
                      [100, 420],
                      [-0.5, -3.5],
                    ),
                    fontSize:
                      Platform.OS === 'android'
                        ? scaleFontSizeToPixelRatioAndroid(fontSizeDifficulty)
                        : fontSizeDifficulty,
                    lineHeight:
                      Platform.OS === 'android'
                        ? scaleFontSizeToPixelRatioAndroid(lineHeightDifficulty)
                        : lineHeightDifficulty,
                  },
                ]}
                key={`left-${char}-${index}`}
                maxFontSizeMultiplier={MAX_TEXT_SIZE_MULTIPLIER}>
                {char}
              </Text>
            ))}
        </View>
      </View>
      <View
        style={[
          styles.bottomRightDifficulty,
          {
            right: interpolate(contentHeight, [100, 420], [3.6, 13.5]),
            bottom: interpolate(contentHeight, [100, 420], [14, 42]),
          },
        ]}>
        <View
          style={[
            styles.leftDifficulty,
            {
              backgroundColor,
              paddingVertical: interpolate(contentHeight, [100, 420], [2, 5]),
            },
          ]}>
          {difficultyString.split('').map((char: string, index: number) => (
            <Text
              style={[
                styles.topicText,
                {
                  transform: [{ rotate: '90deg' }],
                  fontFamily: 'JockeyOne-Regular',
                  marginTop: interpolate(
                    contentHeight,
                    [100, 420],
                    [-0.5, -3.5],
                  ),
                  marginBottom: interpolate(
                    contentHeight,
                    [100, 420],
                    [-0.5, -3.5],
                  ),
                  fontSize:
                    Platform.OS === 'android'
                      ? scaleFontSizeToPixelRatioAndroid(fontSizeDifficulty)
                      : fontSizeDifficulty,
                  lineHeight:
                    Platform.OS === 'android'
                      ? scaleFontSizeToPixelRatioAndroid(lineHeightDifficulty)
                      : lineHeightDifficulty,
                },
              ]}
              key={`right-${char}-${index}`}
              maxFontSizeMultiplier={MAX_TEXT_SIZE_MULTIPLIER}>
              {char}
            </Text>
          ))}
        </View>
      </View>
      {disableBack ? null : (
        <View style={styles.margin}>
          <CardBack height={1.06 * contentHeight} fill={'#8D7C63'} />
        </View>
      )}
      <CardMarginSvg
        height={contentHeight}
        fill={cardBackType === 'blue' ? '#9AC1D1' : undefined}
      />
    </View>
  );
};

export default TopicQuestionCardMargins;
