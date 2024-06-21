import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BaseText } from 'components/base/base-text/BaseText';
import { useTopicContext } from 'pages/topic-page/context/useTopicContext';
import {
  MAX_TEXT_SIZE_MULTIPLIER,
  TOPIC_CONTENT,
  TopicContentKeyType,
} from '@utils';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';
import BaseAnimatedText from 'components/base/base-animated-text/BaseAnimatedText';

type TopicPageHeaderProps = {
  progress: SharedValue<number>;
  length: number;
  type?: TopicContentKeyType;
};

const TopicPageHeader: React.FC<TopicPageHeaderProps> = ({
  progress,
  length,
  type,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const { difficulty } = useTopicContext();

  const title = React.useMemo(() => {
    const content = TOPIC_CONTENT.find(
      (content) => content.key === (type ?? 'world-wonders'),
    );

    return content?.title ?? '';
  }, [type, difficulty]);

  const text = useDerivedValue(() => progress.value.toString());

  return (
    <View style={styles.iconTextContainer} pointerEvents={'box-none'}>
      <View style={styles.row} pointerEvents={'box-none'}>
        <View style={styles.textContainer} pointerEvents={'box-none'}>
          <BaseText
            numberOfLines={1}
            type={'jockey-24'}
            adjustsFontSizeToFit
            minimumFontScale={0.6}
            style={styles.iconText}>
            {title}
          </BaseText>
          <BaseText
            numberOfLines={1}
            type={'texturina-16-regular'}
            adjustsFontSizeToFit
            minimumFontScale={0.6}
            style={styles.difficulty}>
            {`Level ${difficulty}`}
          </BaseText>
        </View>
        <View style={styles.sRow}>
          <BaseAnimatedText
            style={styles.subtitle}
            text={text}
            maxFontSizeMultiplier={MAX_TEXT_SIZE_MULTIPLIER}
          />
          <BaseText type={'texturina-20-semi-bold'} style={styles.lastStep}>
            {`/${length}`}
          </BaseText>
        </View>
      </View>
    </View>
  );
};

export default TopicPageHeader;
