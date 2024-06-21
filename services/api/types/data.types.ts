export type RegisterUserData = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  credentials: [
    {
      type: 'password';
      value: string;
      temporary: boolean;
    },
  ];
};

export type UpdateProfileData = {
  first_name?: string;
  last_name?: string;
  email?: string;
  username?: string;
};
