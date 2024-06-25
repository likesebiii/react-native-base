import React from 'react';
import { View, Text, Platform } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { useTopicContext } from 'pages/topic-page/context/useTopicContext';
import { interpolate } from 'react-native-reanimated';
import {
  MAX_TEXT_SIZE_MULTIPLIER,
  reverseString,
  scaleFontSizeToPixelRatioAndroid,
} from '@utils';

interface TopicContentCardMarginsProps {
  contentHeight: number;
  topic?: string;
}

const TopicContentCardMargins: React.FC<TopicContentCardMarginsProps> = ({
  contentHeight,
  topic: topicFromProps,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const { topic: topicFromContext } = useTopicContext();
  const topic = topicFromProps ?? topicFromContext;

  const fontSizeDifficulty = interpolate(contentHeight, [100, 420], [4, 14]);
  const lineHeightDifficulty = interpolate(contentHeight, [100, 420], [4, 14]);

  return (
    <View style={styles.margin}>
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
              paddingVertical: interpolate(contentHeight, [100, 420], [2, 5]),
            },
          ]}>
          {reverseString(topic)
            .split('')
            .map((char: string, index: number) => (
              <Text
                maxFontSizeMultiplier={MAX_TEXT_SIZE_MULTIPLIER}
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
                key={`left-${char}-${index}`}>
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
              paddingVertical: interpolate(contentHeight, [100, 420], [2, 5]),
            },
          ]}>
          {topic.split('').map((char: string, index: number) => (
            <Text
              maxFontSizeMultiplier={MAX_TEXT_SIZE_MULTIPLIER}
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
              key={`right-${char}-${index}`}>
              {char}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default TopicContentCardMargins;
