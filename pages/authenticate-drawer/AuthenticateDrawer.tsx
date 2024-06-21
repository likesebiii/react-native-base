import React from 'react';
import { View } from 'react-native';
import {
  useBaseAuthenticate,
  useBaseAspect,
  useBaseStateAndRef,
  useBaseAnalytics,
} from '@hooks';
import { aspectStyle } from './aspect';
import { PageProps } from 'templates/utils';
import Drawer from 'templates/drawer/Drawer';
import { BasePrimaryButton } from 'components/base/base-primary-button/BasePrimaryButton';
import BaseSocialButtons from 'components/base/base-social-buttons/BaseSocialButtons';
import { BaseSecondaryButton } from 'components/base/base-secondary-button/BaseSecondaryButton';
import { NAVIGATION_CONTROLLER } from 'services/navigation';
import Animated, { FadeIn } from 'react-native-reanimated';
import { entering, exiting } from '@utils';
import BaseTextInput from 'components/base/base-text-input/BaseTextInput';
import { BaseText } from 'components/base/base-text/BaseText';

type AuthenticationState = 'login' | 'sign-up';

type AuthenticateDrawerProps = {
  state?: AuthenticationState;
};

const AuthenticateDrawer: React.FC<AuthenticateDrawerProps & PageProps> = ({
  state: initialState,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const [secure, setSecure, secureRef] = useBaseStateAndRef(false);
  const [error, setError] = useBaseStateAndRef<string>(' ');
  const [state, setState] = useBaseStateAndRef<{
    initial: boolean;
    type: AuthenticationState;
  }>({ type: initialState ?? 'login', initial: true });
  const [button, setButton, buttonRef] = useBaseStateAndRef(true);

  const stateRef = React.useRef<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const {
    onLogin,
    onRegister,
    loadingState,
    onContinueApple,
    onContinueGoogle,
  } = useBaseAuthenticate();

  const onClose = () => {
    NAVIGATION_CONTROLLER.close();
  };

  const onChange = () => {
    if (error) {
      setError(' ');
    }

    if (
      stateRef.current.email.trim() !== '' &&
      stateRef.current.password.trim() !== ''
    ) {
      if (buttonRef.current !== false) {
        setButton(false);
      }
    } else {
      if (buttonRef.current !== true) {
        setButton(true);
      }
    }
  };

  const onChangeEmail = (text: string) => {
    stateRef.current.email = text;
    onChange();
  };

  const onChangePassword = (text: string) => {
    stateRef.current.password = text;

    if (text.trim() !== '') {
      if (secureRef.current !== true) {
        setSecure(true);
      }
    } else {
      if (secureRef.current !== false) {
        setSecure(false);
      }
    }

    onChange();
  };

  const onSubmit = () => {
    if (
      stateRef.current.email.trim() !== '' &&
      stateRef.current.password.trim() !== ''
    ) {
      const onSubmit = state.type === 'login' ? onLogin : onRegister;

      onSubmit({
        credentials: {
          email: stateRef.current.email,
          password: stateRef.current.password,
        },
      }).catch((error: string) => {
        setError(error);
      });
    }
  };

  const onPress = () => {
    setError(' ');
    setState({
      type: state.type === 'login' ? 'sign-up' : 'login',
      initial: false,
    });
  };

  useBaseAnalytics({ page: 'authenticate-drawer' });

  return (
    <Drawer
      title={state.type === 'login' ? 'Log in' : 'Create your account'}
      onClose={onClose}
      bottomSheetProps={{
        backgroundStyle: styles.modalStyle,
        onClose: onClose,
      }}>
      <Animated.View
        style={styles.listContent}
        entering={state.initial ? FadeIn : entering}
        exiting={exiting}
        key={`authentication-${state.type}`}>
        <BaseTextInput
          placeholder={'Email'}
          type={'bottom-sheet'}
          inputType={'email'}
          onChangeText={onChangeEmail}
          error={error.trim() !== ''}
        />
        <View style={styles.margin}>
          <BaseTextInput
            placeholder={'Password'}
            type={'bottom-sheet'}
            inputType={'password'}
            onChangeText={onChangePassword}
            onSubmit={onSubmit}
            error={error.trim() !== ''}
            disableSecure={!secure}
          />
        </View>
        <BaseText style={styles.errorText}>{error}</BaseText>
        <BasePrimaryButton
          onPress={onSubmit}
          containerStyle={styles.margin}
          title={
            state.type === 'login' ? 'Log in with email' : 'Create account'
          }
          state={
            loadingState !== undefined
              ? 'loading'
              : button
              ? 'disabled'
              : 'enabled'
          }
        />
        <View style={styles.buttonsContainer}>
          <BaseSocialButtons
            onGooglePress={onContinueGoogle}
            onApplePress={onContinueApple}
            loading={!!loadingState}
            authenticateType={state.type}
          />
        </View>
        <BaseSecondaryButton
          title={
            state.type === 'login' ? 'Create account' : 'Got an account? Log in'
          }
          onPress={onPress}
        />
      </Animated.View>
    </Drawer>
  );
};

export default AuthenticateDrawer;
