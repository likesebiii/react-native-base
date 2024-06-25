import {
  TopicCardContentType,
  TopicContentKeyType,
  getTopicContent,
} from '@utils';
import React from 'react';
import { useTopicContext } from '../context/useTopicContext';
import { useSharedValue } from 'react-native-reanimated';

export const useTopicContent = ({
  type,
  onSwipe,
  contentFromProps,
  fromQuestion,
}: {
  type: TopicContentKeyType;
  contentFromProps?: TopicCardContentType[];
  onSwipe?: () => void;
  fromQuestion?: number;
}) => {
  const { difficulty } = useTopicContext();

  const fullContent = React.useMemo(
    () =>
      contentFromProps ??
      getTopicContent({
        type,
        difficulty,
        enableFiltering: false,
        fromQuestion,
      }),
    [contentFromProps],
  );
  const content = React.useMemo(
    () =>
      contentFromProps ?? getTopicContent({ type, difficulty, fromQuestion }),
    [contentFromProps],
  );

  const length = fullContent.filter(
    (element) => element.type !== 'question' || element.id !== -1,
  ).length;

  const progress = useSharedValue(fullContent.length - content.length);

  const onSwipeCallback = () => {
    onSwipe?.();

    if (progress.value < fullContent.length) {
      progress.value = progress.value + 1;
    }
  };

  return {
    fullContent,
    content,
    length: length,
    onSwipeCallback,
    progress,
  };
};
