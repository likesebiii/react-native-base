import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BaseText } from 'components/base/base-text/BaseText';
import TopicContentCardMargins from '../topic-content-card-margins/TopicContentCardMargins';
import { getCardHeight } from 'pages/topic-page/constants';
import BaseDivider from 'components/base/base-divider/BaseDivider';

interface TopicFeedLastCardProps {
  topic?: string;
}

const TopicFeedLastCard: React.FC<TopicFeedLastCardProps> = ({ topic }) => {
  const { styles, screenHeight } = useBaseAspect(aspectStyle);

  const contentHeight = getCardHeight(screenHeight);

  return (
    <>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <BaseText
            style={styles.title}
            type={'texturina-24-semi-bold'}
            adjustsFontSizeToFit
            maxFontSizeMultiplier={1}>
            {'Recommended Cards Finished'}
          </BaseText>
          <View style={{ width: '100%' }}>
            <BaseDivider />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginTop: 8,
              }}>
              <View style={{ paddingLeft: 16, paddingRight: 16 }}>
                <BaseText
                  style={styles.subtitle}
                  type={'texturina-16-regular'}
                  maxFontSizeMultiplier={1}>
                  <BaseText
                    style={styles.subtitle}
                    type={'texturina-16-semi-bold'}>
                    {'Continue'}
                  </BaseText>
                  <BaseText
                    style={styles.subtitle}
                    type={'texturina-16-regular'}>
                    {' with a new topic\n'}
                    <BaseText type={'texturina-16-semi-bold'}>
                      {'to unlock'}
                    </BaseText>
                    {' new cards.'}
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

export default TopicFeedLastCard;
