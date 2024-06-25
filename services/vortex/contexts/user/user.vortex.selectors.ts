import { UserVortexType } from 'services/vortex/contexts/user/user.vortex.state';

export const UserVortexSelectors = {
  selectCollectedQuestions: (userVortex: UserVortexType) => {
    return userVortex.collectedQuestions;
  },
  selectOnboardingTopics: (userVortex: UserVortexType) => {
    return userVortex.onboarding.topics ?? [];
  },
  selectUserLives: (userVortex: UserVortexType) => {
    return userVortex.lives.count;
  },
  selectUserCurrentStreak: (userVortex: UserVortexType) => {
    return userVortex.streak.current;
  },
  selectOnboardingLastStepCount: (userVortex: UserVortexType) => {
    return userVortex.onboarding.lastStepCount;
  },
  selectSetupLastStepCount: (userVortex: UserVortexType) => {
    return userVortex.setup.lastStepCount;
  },
  selectUserSubscription: (userVortex: UserVortexType) => {
    return userVortex.pro.subscription;
  },
  selectUserSubscriptionType: (userVortex: UserVortexType) => {
    return userVortex.pro.subscription ? 'pro' : 'free';
  },
  selectShouldShowFeedback: (userVortex: UserVortexType) => {
    return !userVortex.feedback && !userVortex.showedFeedbackCurrentSession;
  },
  selectIsNSI: (userVortex: UserVortexType) => {
    return userVortex.setup.loggedAsNSI;
  },
};

export type UserVortexSelectorsType = {
  [V in keyof typeof UserVortexSelectors]: (
    ...params: Parameters<(typeof UserVortexSelectors)[V]>
  ) => ReturnType<(typeof UserVortexSelectors)[V]>;
};
