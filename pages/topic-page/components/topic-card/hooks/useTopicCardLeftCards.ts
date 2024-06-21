import { useSelectVortex } from '@services';
import { TopicCardContentType } from '@utils';
import React from 'react';

export const useTopicCardLeftCards = ({
  fullContent,
}: {
  fullContent: TopicCardContentType[];
}) => {
  const allCollectedQuestions = useSelectVortex(
    'user-vortex',
    'selectCollectedQuestions',
  );

  const questions = React.useMemo(() => {
    return fullContent.filter((content) => content.type === 'question');
  }, [fullContent]);
  const earnedQuestions = React.useMemo(() => {
    return questions.reduce((acc, curr) => {
      if (curr.type === 'content') {
        return acc;
      } else {
        if (allCollectedQuestions.includes(curr.id)) {
          return acc + 1;
        } else {
          return acc;
        }
      }
    }, 0);
  }, [allCollectedQuestions, questions]);
  const leftQuestions = React.useMemo(() => {
    return questions.length - earnedQuestions;
  }, [earnedQuestions]);

  return { earnedQuestions, leftQuestions };
};
