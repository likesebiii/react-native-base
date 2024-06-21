import { FunctionalComponent } from '@types';
import { EMPTY_FUNCTION } from '@utils';
import React from 'react';
import { Platform } from 'react-native';
import {
  SharedValue,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { TopicContentDifficultyType } from 'utils/content';
import { TopicCardGestureType } from '../components/topic-card/hooks/useTopicCardGestures';
import { Dimensions } from '@services';

export const INITIAL_Z_INDEX = 1000;
export const NUMBER_OF_CARDS = 3;
export const THRESHOLD = Dimensions.get('width') / 12;
export const THRESHOLD_Y = Dimensions.get('height') / 20;

type TopicProvider = {
  topic?: string;
  difficulty?: TopicContentDifficultyType;
};

type TopicContextState = {
  pressedCard: SharedValue<number>;
  cardZIndex: SharedValue<number>;
  contentIndex: SharedValue<number>;
  backPressed: SharedValue<number>;
  questionProgress: SharedValue<number>;
  questionAnswer: SharedValue<number>;
  focusedCardType: SharedValue<'question' | 'content' | 'achievement'>;
  topic: string;
  difficulty: TopicContentDifficultyType;
  simulateGestureRef: React.MutableRefObject<
    ((type: TopicCardGestureType) => void) | undefined
  >;
};

export const TopicContext = React.createContext<TopicContextState>({
  pressedCard: {
    value: INITIAL_Z_INDEX,
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  cardZIndex: {
    value: INITIAL_Z_INDEX,
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  contentIndex: {
    value: INITIAL_Z_INDEX,
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  backPressed: {
    value: 0,
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  focusedCardType: {
    value: 'content',
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  questionProgress: {
    value: 0,
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  questionAnswer: {
    value: 4,
    addListener: EMPTY_FUNCTION,
    removeListener: EMPTY_FUNCTION,
    modify: EMPTY_FUNCTION,
  },
  topic: '',
  difficulty: 1,
  simulateGestureRef: { current: undefined },
});

const TopicProvider: FunctionalComponent<TopicProvider> = ({
  children,
  topic = '',
  difficulty = 1,
}) => {
  const pressedCard = useSharedValue(-1);

  const cardZIndex = useSharedValue(INITIAL_Z_INDEX);
  const contentIndex = useSharedValue(0);

  const questionProgress = useSharedValue(0);
  const questionAnswer = useSharedValue(4);

  const focusedCardType = useSharedValue<
    'question' | 'content' | 'achievement'
  >('content');

  const backPressed = useSharedValue(0);

  const simulateGestureRef =
    React.useRef<(type: TopicCardGestureType) => void>();

  React.useEffect(() => {
    if (Platform.OS !== 'ios') {
      cardZIndex.value = withSequence(
        withTiming(INITIAL_Z_INDEX - 0.1),
        withTiming(INITIAL_Z_INDEX),
      );
    }
  }, []);

  const getNewContextValue = React.useCallback((): TopicContextState => {
    return {
      pressedCard,
      cardZIndex,
      contentIndex,
      backPressed,
      questionProgress,
      questionAnswer,
      focusedCardType,
      topic,
      difficulty,
      simulateGestureRef,
    };
  }, []);

  const contextValue = getNewContextValue();

  return (
    <TopicContext.Provider value={contextValue}>
      {children}
    </TopicContext.Provider>
  );
};

export default TopicProvider;
