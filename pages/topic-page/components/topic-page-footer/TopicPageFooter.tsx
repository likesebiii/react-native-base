import React from 'react';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { useTopicCardLeftCards } from '../topic-card/hooks/useTopicCardLeftCards';
import { TopicCardContentType } from '@utils';
import FeedBottomBar from 'pages/feed-page/components/feed-bottom-bar/FeedBottomBar';

type TopicPageFooterProps = {
  fullContent: TopicCardContentType[];
};

export const TOPIC_PAGE_FOOTER_CONTROLLER: {
  display?: React.Dispatch<React.SetStateAction<boolean>>;
} = {};

const TopicPageFooter: React.FC<TopicPageFooterProps> = ({ fullContent }) => {
  const {} = useBaseAspect(aspectStyle);

  const { leftQuestions } = useTopicCardLeftCards({ fullContent });

  const [display, setDisplay] = React.useState(false);

  React.useEffect(() => {
    TOPIC_PAGE_FOOTER_CONTROLLER.display = setDisplay;

    return () => {
      if (TOPIC_PAGE_FOOTER_CONTROLLER.display === setDisplay) {
        TOPIC_PAGE_FOOTER_CONTROLLER.display = undefined;
      }
    };
  }, []);

  return (
    <>
      {display === false ? undefined : (
        <FeedBottomBar type={leftQuestions === 0 ? 'upgrade' : 'retry'} />
      )}
    </>
  );
};

export default TopicPageFooter;
