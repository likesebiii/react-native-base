import VersionCheck from 'react-native-version-check';

const Application = {
  getCurrentBuildNumber: () => {
    return VersionCheck.getCurrentBuildNumber();
  },
};

export default Application;
