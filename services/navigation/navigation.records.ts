import AchievementsExplanationDrawer from 'pages/achievements-explanation-drawer/AchievementsExplanationDrawer';
import RegisterDrawer from 'pages/register-drawer/RegisterDrawer';
import BattleGamePage from 'pages/battle-game-page/BattleGamePage';
import BattlePage from 'pages/battle-page/BattlePage';
import DeckPage from 'pages/deck-page/DeckPage';
import FeedPage from 'pages/feed-page/FeedPage';
import FeedbackDrawer from 'pages/feedback-drawer/FeedbackDrawer';
import GamePage from 'pages/game-page/GamePage';
import LivesDrawer from 'pages/lives-drawer/LivesDrawer';
import PaywallPage from 'pages/paywall-page/PaywallPage';
import ProfilePage from 'pages/profile-page/ProfilePage';
import RootPage from 'pages/root-page/RootPage';
import SettingsDeveloperMenuPage from 'pages/settings-developer-menu-page/SettingsDeveloperMenuPage';
import SettingsDeveloperReviewContentPage from 'pages/settings-developer-review-content-page/SettingsDeveloperReviewContentPage';
import SettingsInterestsPage from 'pages/settings-interests-page/SettingsInterestsPage';
import SettingsManageSubscriptionPage from 'pages/settings-manage-subscription-page/SettingsManageSubscriptionPage';
import SettingsPage from 'pages/settings-page/SettingsPage';
import SetupPage from 'pages/setup-page/SetupPage';
import AuthenticateDrawer from 'pages/authenticate-drawer/AuthenticateDrawer';
import SplashPage from 'pages/splash-page/SplashPage';
import TopicPage from 'pages/topic-page/TopicPage';
import WelcomePage from 'pages/welcome-page/WelcomePage';

export const NAVIGATION_PAGES_RECORD = {
  'fk.WelcomePage': WelcomePage,
  'fk.RootPage': RootPage,
  'fk.TopicPage': TopicPage,
  'fk.FeedPage': FeedPage,
  'fk.DeckPage': DeckPage,
  'fk.GamePage': GamePage,
  'fk.AuthenticateDrawer': AuthenticateDrawer,
  'fk.SetupPage': SetupPage,
  'fk.SplashPage': SplashPage,
  'fk.RegisterDrawer': RegisterDrawer,
  'fk.ProfilePage': ProfilePage,
  'fk.SettingsPage': SettingsPage,
  'fk.PaywallPage': PaywallPage,
  'fk.SettingsInterestsPage': SettingsInterestsPage,
  'fk.SettingsManageSubscriptionPage': SettingsManageSubscriptionPage,
  'fk.SettingsDeveloperMenuPage': SettingsDeveloperMenuPage,
  'fk.SettingsDeveloperReviewContentPage': SettingsDeveloperReviewContentPage,
  'fk.LivesDrawer': LivesDrawer,
  'fk.FeedbackDrawer': FeedbackDrawer,
  'fk.AchievementsExplanationDrawer': AchievementsExplanationDrawer,
  'fk.BattlePage': BattlePage,
  'fk.BattleGamePage': BattleGamePage,
} as const;

export type NavigationPageNameType = keyof typeof NAVIGATION_PAGES_RECORD;
export type NavigationPageToPropsType<T extends NavigationPageNameType> =
  React.ComponentProps<(typeof NAVIGATION_PAGES_RECORD)[T]>;
