import React from 'react';
import { TopicContext } from './TopicProvider';

export const useTopicContext = () => {
  const topicContextState = React.useContext(TopicContext);

  return topicContextState;
};
