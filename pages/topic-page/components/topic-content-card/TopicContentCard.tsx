import React from 'react';
import { View } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BaseText } from 'components/base/base-text/BaseText';
import TopicContentCardMargins from '../topic-content-card-margins/TopicContentCardMargins';
import { getCardHeight } from 'pages/topic-page/constants';
import { getTagQueryParams } from '@utils';
import BaseBlurImage from 'components/base/base-blur-image/BaseBlurImage';

interface TopicContentCardProps {
  title?: string;
  content: string;
  topic?: string;
  image?: string;
}

const REPLACE_STRING = '####';

const TopicContentCard: React.FC<TopicContentCardProps> = ({
  title,
  content: contentFromProps,
  topic,
  image,
}) => {
  const { styles, screenHeight } = useBaseAspect(aspectStyle);

  const contentHeight = getCardHeight(screenHeight);
  const contentTitleHeight = 57 + 16 + 16;
  const contentNumberOfLines = (contentHeight - 32 - contentTitleHeight) / 19;

  const content = React.useMemo(() => {
    const content = contentFromProps
      .replace(/(<([^>]+)>)/gi, `${REPLACE_STRING}$1${REPLACE_STRING}`)
      .split(REPLACE_STRING)
      .filter((element) => !!element);

    const textStyling: { type: 'normal' | 'bold'; color?: string } = {
      type: 'normal',
    };
    const textsArray: {
      text: string;
      type: 'normal' | 'bold';
      color?: string;
    }[] = [];

    content.forEach((element) => {
      if (element.match(/(<([^>]+)>)/gi)) {
        const pattern = /<([^\s>]+)(\s|>)+/;
        const tag = element.match(pattern)?.[1];
        const params = element.slice(3, -1);

        switch (tag) {
          case 'b':
            textStyling.type = 'bold';
            break;
          case '/b':
            textStyling.type = 'normal';
            break;
          case 'c':
            const tagParams = getTagQueryParams(params);

            textStyling.color = tagParams['color'];
            break;
          case '/c':
            textStyling.color = undefined;
            break;
          default:
            break;
        }
      } else {
        textsArray.push({ text: element, ...textStyling });
      }
    });

    return textsArray;
  }, [contentFromProps]);

  const imageStyle = {
    width: contentHeight * 0.755 - 64,
    height: contentHeight * 0.3,
    borderRadius: contentHeight * 0.04,
  };

  const imageComponent = React.useMemo(() => {
    if (!image) {
      return null;
    }

    return (
      <BaseBlurImage
        key={`topic-content-card-${image}-${title?.slice(0, 5)}`}
        uri={image}
        imageStyle={imageStyle}
        imageProps={{
          resizeMode: 'cover',
        }}
      />
    );
  }, [image]);

  return (
    <View
      style={[
        styles.cardContent,
        {
          height: contentHeight * 1.06,
          width: contentHeight * 0.755,
          borderRadius: contentHeight * 0.04,
          padding: contentHeight * 0.08,
          paddingTop: contentHeight * 0.1,
        },
      ]}>
      {imageComponent}
      <View
        style={[
          styles.textContainer,
          { height: imageComponent ? '70%' : '100%' },
        ]}>
        {title ? (
          <BaseText
            style={styles.title}
            type={'texturina-24-semi-bold'}
            adjustsFontSizeToFit
            maxFontSizeMultiplier={1}
            minimumFontScale={0.85}
            numberOfLines={6}>
            {title}
          </BaseText>
        ) : null}
        <BaseText
          style={styles.subtitle}
          type={'texturina-16-regular'}
          adjustsFontSizeToFit
          numberOfLines={contentNumberOfLines}
          minimumFontScale={0.9}>
          {content.map((element, index) => {
            return (
              <BaseText
                style={[
                  {
                    lineHeight: undefined,
                  },
                  { color: element.color },
                ]}
                type={`texturina-16-${
                  element.type === 'bold' ? 'bold' : 'regular'
                }`}
                adjustsFontSizeToFit
                numberOfLines={contentNumberOfLines}
                minimumFontScale={0.9}
                key={`topic-content-card-${index}-${element.type}`}>
                {element.text}
              </BaseText>
            );
          })}
        </BaseText>
      </View>
      <TopicContentCardMargins contentHeight={contentHeight} topic={topic} />
    </View>
  );
};

export default TopicContentCard;
