import { LIVES_LIMIT, getDateDifferenceInDaysMidnight } from '@utils';
import { PUSH_NOTIFICATIONS_CONTROLLER } from 'utils/notifications';
import { UserVortexInitial } from 'services/vortex/contexts/user/user.vortex.state';
import Vortex from 'services/vortex/utils/vortex';
import { Analytics } from '@services';

export const UserVortexActions = {
  addCollectedQuestion: (question: number) => {
    const collectedQuestions = [
      ...new Set([
        ...Vortex.getObject('user-vortex').collectedQuestions,
        question,
      ]),
    ];

    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      collectedQuestions,
    }));
  },
  addUserLives: (count: number, date?: boolean) => {
    Vortex.changeObject('user-vortex', (userObject) => {
      const limit = LIVES_LIMIT[userObject.pro.subscription ? 'pro' : 'free'];

      return {
        ...userObject,
        lives: {
          ...userObject.lives,
          count: Math.min(limit, userObject.lives.count + count),
          date: date
            ? new Date(Date.now()).toISOString().slice(0, -1)
            : userObject.lives.date,
          notification: false,
        },
      };
    });
  },
  setUserLives: (count: number, date?: boolean) => {
    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      lives: {
        ...userObject.lives,
        count: count,
        date: date
          ? new Date(Date.now()).toISOString().slice(0, -1)
          : userObject.lives.date,
        notification: false,
      },
    }));
  },
  setUserLifeNotification: (notification: boolean) => {
    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      lives: {
        ...userObject.lives,
        notification,
      },
    }));
  },
  removeUserLives: (count: number) => {
    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      lives: {
        ...userObject.lives,
        count: Math.max(0, userObject.lives.count - count),
      },
    }));
  },
  changeLivesDate: (date?: string) => {
    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      lives: {
        ...userObject.lives,
        date: date ?? new Date(Date.now()).toISOString().slice(0, -1),
      },
    }));
  },
  setUserStreak: (streak: number) => {
    const notification = Vortex.getObject('user-vortex').streak.notification;

    if (notification !== true) {
      PUSH_NOTIFICATIONS_CONTROLLER.cancelNotifications([
        'streak-notification',
      ]);
      setTimeout(() => {
        PUSH_NOTIFICATIONS_CONTROLLER.triggerStreakNotification();
      }, 500);
    }

    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      streak: {
        ...userObject.streak,
        current: streak,
        lastDay: new Date().toISOString().slice(0, -1),
        notification: true,
      },
    }));
  },
  incrementUserStreak: () => {
    const currentDate = new Date().toISOString().slice(0, -1);
    const userObject = Vortex.getObject('user-vortex');
    const lastStreakDate = userObject.streak.lastDay;

    if (
      lastStreakDate === undefined ||
      userObject.streak.current === 0 ||
      Math.floor(
        getDateDifferenceInDaysMidnight(currentDate, lastStreakDate),
      ) === 1
    ) {
      PUSH_NOTIFICATIONS_CONTROLLER.cancelNotifications([
        'streak-notification',
      ]);
      setTimeout(() => {
        PUSH_NOTIFICATIONS_CONTROLLER.triggerStreakNotification();
      }, 500);

      Vortex.changeObject('user-vortex', (userObject) => ({
        ...userObject,
        streak: {
          current: userObject.streak.current + 1,
          lastDay: new Date().toISOString().slice(0, -1),
          notification: true,
        },
      }));
    } else if (
      Math.floor(getDateDifferenceInDaysMidnight(currentDate, lastStreakDate)) >
      1
    ) {
      PUSH_NOTIFICATIONS_CONTROLLER.cancelNotifications([
        'streak-notification',
      ]);
      setTimeout(() => {
        PUSH_NOTIFICATIONS_CONTROLLER.triggerStreakNotification();
      }, 500);

      Vortex.changeObject('user-vortex', (userObject) => ({
        ...userObject,
        streak: {
          current: 1,
          lastDay: new Date().toISOString().slice(0, -1),
          notification: true,
        },
      }));
    }
  },
  resetUserStreak: () => {
    PUSH_NOTIFICATIONS_CONTROLLER.cancelNotifications(['streak-notification']);

    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      streak: {
        ...userObject.streak,
        current: 0,
        lastDay: undefined,
        notification: false,
      },
    }));
  },
  incrementOnboardingStep: (step: number) => {
    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      onboarding: {
        ...userObject.onboarding,
        lastStepCount: step,
      },
    }));
  },
  changeOnboardingProps: (props: {
    mainGoal?: string;
    topics?: string[];
    notificationsOn?: boolean;
    canYouHandle?: string;
    downGesture?: boolean;
    correctAnswer?: boolean;
  }) => {
    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      onboarding: {
        ...userObject.onboarding,
        mainGoal: props.mainGoal ?? userObject.onboarding.mainGoal,
        topics: props.topics ?? userObject.onboarding.topics,
        notificationsOn:
          props.notificationsOn ?? userObject.onboarding.notificationsOn,
        canYouHandle: props.canYouHandle ?? userObject.onboarding.canYouHandle,
        downGesture: props.downGesture ?? userObject.onboarding.downGesture,
        correctAnswer:
          props.correctAnswer ?? userObject.onboarding.correctAnswer,
      },
    }));
  },
  resetUserObjectOnLogout: () => {
    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      onboarding: {
        ...UserVortexInitial.onboarding,
      },
      setup: {
        ...UserVortexInitial.setup,
        loggedAsNSI: false,
        limitNSI: 0,
        enteredMap: false,
      },
      pro: {
        ...UserVortexInitial.pro,
        setUserDetails: false,
      },
      dev: {
        ...UserVortexInitial.dev,
      },
    }));
  },
  setNSIState: (loggedIn: boolean) => {
    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      setup: {
        ...userObject.setup,
        loggedAsNSI: loggedIn,
        limitNSI: 0,
      },
    }));
  },
  incrementNSILimit: () => {
    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      setup: {
        ...userObject.setup,
        limitNSI: userObject.setup.limitNSI + 1,
      },
    }));
  },
  incrementSetupStep: (step: number) => {
    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      setup: {
        ...userObject.setup,
        lastStepCount: step,
      },
    }));
  },
  changeSetupNotifications: (notifications: boolean) => {
    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      setup: {
        ...userObject.setup,
        notifications,
      },
    }));
  },
  changeSetupEnteredMap: (enteredMap: boolean) => {
    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      setup: {
        ...userObject.setup,
        enteredMap,
      },
    }));
  },
  setPurchaseUserDetails: () => {
    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      pro: {
        ...userObject.pro,
        setUserDetails: true,
      },
    }));
  },
  changeFeedback: (
    showedFeedbackCurrentSession?: boolean,
    feedback?: boolean,
  ) => {
    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      feedback: feedback ?? userObject.feedback,
      showedFeedbackCurrentSession:
        showedFeedbackCurrentSession ?? userObject.showedFeedbackCurrentSession,
    }));
  },
  changeUserSubscription: (type: 'pro' | 'free') => {
    if (
      Vortex.getObject('user-vortex').pro.subscription ===
      (type === 'pro' ? true : false)
    ) {
      return;
    }

    Analytics.log('changeUserSubscription', { type }, [
      'firebase',
      'amplitude',
    ]);

    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      lives: {
        ...userObject.lives,
        count:
          type === 'pro'
            ? LIVES_LIMIT.pro
            : userObject.lives.count > LIVES_LIMIT.free
            ? LIVES_LIMIT.free
            : userObject.lives.count,
        date: new Date(Date.now()).toISOString().slice(0, -1),
      },
      pro: {
        ...userObject.pro,
        subscription: type === 'pro' ? true : false,
      },
    }));

    if (type === 'pro') {
      PUSH_NOTIFICATIONS_CONTROLLER.cancelNotifications([
        'streak-notification',
      ]);
      setTimeout(() => {
        PUSH_NOTIFICATIONS_CONTROLLER.triggerStreakNotification();
      }, 500);
    }
  },
  skipQuestion: (questionId: number) => {
    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      dev: {
        ...userObject.dev,
        skippedQuestions: [
          ...new Set([...userObject.dev.skippedQuestions, questionId]),
        ],
      },
    }));
  },
  resetSkippedQuestions: () => {
    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      dev: {
        ...userObject.dev,
        skippedQuestions: [],
      },
    }));
  },
  changeRate: (rateSuccess: boolean) => {
    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      rateSuccess,
    }));
  },
  changeRateThisSession: (rateThisSession: boolean) => {
    Vortex.changeObject('user-vortex', (userObject) => ({
      ...userObject,
      rateThisSession,
    }));
  },
} as const;

export type UserVortexActionsType = {
  [V in keyof typeof UserVortexActions]: (typeof UserVortexActions)[V];
};
