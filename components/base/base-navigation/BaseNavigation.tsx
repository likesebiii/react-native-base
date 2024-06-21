import React from 'react';
import BaseFixedNavigation, {
  BaseFixedNavigationProps,
} from './base-fixed-navigation/BaseFixedNavigation';
import BaseRebrandNavigation, {
  BaseRebrandNavigationProps,
} from './base-rebrand-navigation/BaseRebrandNavigation';

export type BaseNavigationGenericProps =
  | BaseFixedNavigationProps
  | BaseRebrandNavigationProps;

type BaseNavigationProps = {
  navigationProps: BaseNavigationGenericProps;
};

const BaseNavigation: React.FC<BaseNavigationProps> = ({ navigationProps }) => {
  switch (navigationProps.type) {
    case 'rebrand':
      return <BaseRebrandNavigation {...navigationProps} />;
    default:
      return <BaseFixedNavigation {...navigationProps} />;
  }
};

export default BaseNavigation;
