const Events = {
  requestNotificationsPermission: {
    name: 'Request Notifications Permission',
    params: { notifications: Boolean(), location: String(), device: String() },
  },
  signUp: {
    name: 'Sign Up',
    params: {
      method: String(),
      email: String(),
    },
  },
  refreshAuthenticationToken: {
    name: 'Refresh Authentication Token',
    params: {},
  },
  tokenError: {
    name: 'Token Error',
    params: { type: String(), error: String() },
  },
  openPage: {
    name: 'Open Page',
    params: { page: String(), type: String() },
  },
  onboardingContinueStep: {
    name: 'Onboarding Continue Step',
    params: {},
  },
  setupContinueStep: {
    name: 'Setup Continue Step',
    params: { type: String() },
  },
  onboardingStep: {
    name: 'Onboarding Step',
    params: {},
  },
  tapElement: {
    name: 'Tap Element',
    params: {
      location: String(),
      element: String(),
      type: String(),
      difficulty: String(),
      state: String(),
    },
  },
  settingsTap: { name: 'Settings Tap', params: {} },
  openWelcome: { name: 'Open Welcome', params: {} },
  paywallAction: { name: 'Paywall Action', params: {} },
  startTrial: { name: 'Start Trial', params: {} },
  subscribeError: { name: 'Subscribe Error', params: {} },
  subscribeSuccess: { name: 'Subscribe Success', params: {} },
  enterPaywall: { name: 'Enter Paywall', params: {} },
  successfulNotification: { name: 'Successful Notification', params: {} },
  openHome: { name: 'Open Home', params: {} },
  openHomeNewUser: { name: 'Open Home New User', params: {} },
  openHomeNSIUser: { name: 'Open Home NSI User', params: {} },
  changeUserSubscription: { name: 'Change User Subscription', params: {} },
  changeTab: { name: 'Change Tab', params: {} },
  setupStep: { name: 'Setup Step', params: {} },
  openTopicPage: { name: 'Open Topic Page', params: {} },
  answerQuestion: { name: 'Answer Question', params: {} },
  cardSwap: { name: 'Card Swap', params: {} },
  showCustomRate: { name: 'Show Custom Rate', params: {} },
  askForRate: { name: 'Ask For Rate', params: {} },
  configurationError: { name: 'Configuration Error', params: {} },
} as const;

export default Events;
