import { NavigationType } from '@types';

export type PageProps = {};
export type NavigationProps = {
  type?: NavigationType;
  title?: string;
  titleComponent?: JSX.Element;
  rightComponent?: JSX.Element;
  onClose?: () => void;
  backHandler?: boolean;
};
