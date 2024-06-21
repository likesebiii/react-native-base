import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Google = {
  init: () => {
    GoogleSignin.configure({
      webClientId:
        '783405493492-i3hl9vr6sqt9qtq13ihorphhjd2mq20u.apps.googleusercontent.com',
    });
  },
} as const;

export default Google;
