import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import Page from 'templates/page/Page';
import { PageProps } from 'templates/utils';
import { ScrollView } from 'react-native';
import {
  getQuestionContent,
  getQuestionData,
  getQuestionsRecommendation,
  getQuestionType,
  getTagQueryParams,
  BASE_TOP_PADDING,
  TopicInformationType,
  TopicQuestionsType,
} from '@utils';
import { BaseText } from 'components/base/base-text/BaseText';
import { View } from 'react-native';
import { BasePrimaryButton } from 'components/base/base-primary-button/BasePrimaryButton';
import Clipboard from '@react-native-clipboard/clipboard';
import { Vortex } from '@services';
import Toast from 'react-native-toast-message';

type SettingsDeveloperReviewContentPageProps = {};

const REPLACE_STRING = '####';

const getContent = (contentFromProps: string) => {
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
};

const SettingsDeveloperReviewContentPage: React.FC<
  SettingsDeveloperReviewContentPageProps & PageProps
> = ({}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const [index, setIndex] = React.useState(0);

  const questions = React.useMemo(() => {
    const initialExcludeArray =
      Vortex.getObject('user-vortex').dev.skippedQuestions;

    return getQuestionsRecommendation({
      allQuestion: true,
      enableTopicLevel: false,
      initialExcludeArray,
      removeShuffle: true,
    });
  }, []);

  const question = questions[index] as TopicQuestionsType;

  const topic = getQuestionType(question.id);
  const data = getQuestionData(question.id);

  const content = getQuestionContent(
    question.id,
    true,
  ) as never as TopicInformationType[];

  const onSkipPress = () => {
    Vortex.dispatch('user-vortex', 'skipQuestion')(question.id);
    if (index < questions.length - 1) {
      setIndex(index + 1);
    }
  };

  const onClipboardPress = () => {
    const text = content.reduce((acc, current) => {
      return acc + `${JSON.stringify(current)}\n\n`;
    }, `` as string);

    Clipboard.setString(text);

    Toast.show({
      type: 'success',
      text1: 'Successfully copied to clipboard',
      swipeable: false,
    });
  };

  return (
    <Page
      style={styles.container}
      navigation={{
        type: 'rebrand',
        title: 'Review Content',
        backHandler: true,
      }}>
      <BasePrimaryButton
        title={'Skip question'}
        containerStyle={{ marginTop: BASE_TOP_PADDING }}
        onPress={onSkipPress}
      />
      <BasePrimaryButton
        title={'Copy content'}
        containerStyle={{ marginTop: 24, paddingBottom: 16 }}
        onPress={onClipboardPress}
      />
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        <BaseText type={'texturina-20-regular'} style={{ marginTop: 16 }}>
          {`Topic: `}
          <BaseText type={'texturina-20-regular'}>{`${topic}`}</BaseText>
        </BaseText>
        <BaseText type={'texturina-20-regular'} style={{ marginTop: 16 }}>
          {`Level `}
          <BaseText type={'texturina-20-regular'}>{`${data.key}\n`}</BaseText>
        </BaseText>
        <BaseText type={'texturina-16-regular'} style={{ marginTop: 16 }}>
          {`Question id: `}
          <BaseText
            type={'texturina-16-semi-bold'}>{`${question.id}`}</BaseText>
        </BaseText>
        <BaseText type={'texturina-16-semi-bold'}>
          {'\n'}
          {question.title}
        </BaseText>
        <BaseText type={'texturina-16-regular'}>
          {'\n'}
          {question?.answers.map((answer, index) => {
            return (
              <BaseText
                type={'texturina-16-regular'}
                key={answer}
                style={{
                  color: index === question.answer ? 'green' : 'black',
                }}>
                {index}
                {'. '}
                {answer}
                {'\n\n'}
              </BaseText>
            );
          })}
        </BaseText>
        <BaseText type={'texturina-16-semi-bold'}>{'CONTENT:'}</BaseText>
        <BaseText type={'texturina-16-regular'}>
          {content.map((element) => {
            return (
              <View key={`${element.id}-${element.title}`}>
                <BaseText type={'texturina-16-regular'} key={element.id}>
                  {'\nContent id: '}
                  {element.id}
                  {'\n'}
                </BaseText>
                <BaseText type={'texturina-16-semi-bold'} key={element.title}>
                  {element.title}
                  {'\n'}
                </BaseText>
                <BaseText type={'texturina-16-regular'} key={element.content}>
                  {getContent(element.content).map((element) => {
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
                        minimumFontScale={0.9}
                        key={`topic-content-card-${index}-${element.type}-${element.text}`}>
                        {element.text}
                      </BaseText>
                    );
                  })}
                </BaseText>
              </View>
            );
          })}
        </BaseText>
        <View style={{ height: 200 }} />
      </ScrollView>
    </Page>
  );
};

export default SettingsDeveloperReviewContentPage;
