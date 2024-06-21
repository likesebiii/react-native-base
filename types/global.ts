export type UserCredentials = {
  email: string;
  password: string;
};

export type LoginProvider = 'google' | 'apple' | 'email' | 'refresh';

export type BottomBarData = {
  key: string;
  title: string;
};
