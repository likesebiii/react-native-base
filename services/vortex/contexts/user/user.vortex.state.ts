export type UserVortexType = {
  showedFeedbackCurrentSession: boolean;
  feedback: boolean;
  rateSuccess?: boolean;
  rateThisSession?: boolean;
  pro: {
    subscription: boolean;
    setUserDetails: boolean;
  };
  lives: {
    count: number;
    date?: string;
    notification?: boolean;
  };
  streak: {
    current: number;
    lastDay?: string;
    notification?: boolean;
  };
  collectedQuestions: number[];
  onboarding: {
    lastStepCount?: number;
    mainGoal?: string;
    topics?: string[];
    notificationsOn?: boolean;
    canYouHandle?: string;
    downGesture?: boolean;
    correctAnswer?: boolean;
  };
  setup: {
    loggedAsNSI: boolean;
    limitNSI: number;
    lastStepCount?: number;
    notifications: boolean;
    enteredMap: boolean;
  };
  dev: {
    skippedQuestions: number[];
  };
};

export const UserVortexInitial: UserVortexType = {
  showedFeedbackCurrentSession: false,
  feedback: false,
  rateSuccess: false,
  rateThisSession: false,
  pro: { subscription: false, setUserDetails: false },
  lives: {
    count: 0,
    date: new Date(Date.now()).toISOString().slice(0, -1),
    notification: false,
  },
  streak: {
    current: 0,
  },
  collectedQuestions: [],
  onboarding: {
    lastStepCount: undefined,
  },
  setup: {
    loggedAsNSI: false,
    limitNSI: 0,
    lastStepCount: undefined,
    notifications: false,
    enteredMap: false,
  },
  dev: {
    skippedQuestions: [],
  },
};

export const UserVortexBlacklist: (keyof UserVortexType)[] = [
  'showedFeedbackCurrentSession',
  'rateThisSession',
];
