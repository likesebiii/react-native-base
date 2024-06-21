import React from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { useBaseAspect } from '@hooks';
import { aspectStyle } from './aspect';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { colors } from '@theme';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { EyeInvisibleSvg, EyeVisibleSvg } from '@svgs';
import { ACTIVE_OPACITY } from '@utils';

const BASE_TEXT_INPUT_CONTROLLER: {
  next: {
    ref?: TextInput | undefined;
  };
} = {
  next: {},
};

type BaseTextInputProps = {
  ref?: React.MutableRefObject<TextInput | undefined>;
  type?: 'normal' | 'bottom-sheet';
  inputType?: 'normal' | 'email' | 'password';
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onSubmit?: () => void;
  error?: boolean;
  disableSecure?: boolean;
};

const BaseTextInput: React.FC<BaseTextInputProps> = ({
  ref,
  type = 'normal',
  inputType = 'normal',
  placeholder,
  onChangeText,
  onSubmit: onSubmitFromProps,
  error,
  disableSecure,
}) => {
  const { styles, theme } = useBaseAspect(aspectStyle);

  const [secure, setSecure] = React.useState(true);

  const onSecurePress = () => {
    setSecure(!secure);
  };

  const SecureSvg = React.useMemo(() => {
    switch (secure) {
      case false:
        return EyeInvisibleSvg;
      case true:
        return EyeVisibleSvg;
    }
  }, [secure]);

  const TextInputComponent = React.useMemo(() => {
    switch (type) {
      case 'bottom-sheet':
        return BottomSheetTextInput;
      case 'normal':
        return TextInput;
    }
  }, [type]);

  const currentRef = React.useRef<TextInput>();
  const forwardRef = React.useCallback((instance: TextInput | null) => {
    if (!!instance) {
      currentRef.current = instance;

      if (ref) {
        ref.current = instance;
      }

      if (inputType === 'password') {
        BASE_TEXT_INPUT_CONTROLLER.next.ref = instance;
      }
    }
  }, []);

  React.useEffect(() => {
    return () => {
      if (
        inputType === 'password' &&
        BASE_TEXT_INPUT_CONTROLLER.next.ref === currentRef.current
      ) {
        BASE_TEXT_INPUT_CONTROLLER.next.ref = undefined;
      }
    };
  }, []);

  const focused = useSharedValue(0);

  const onFocus = () => {
    focused.value = withTiming(1);
  };

  const onBlur = () => {
    focused.value = withTiming(0);
  };

  const onSubmit = () => {
    if (inputType === 'email' && BASE_TEXT_INPUT_CONTROLLER.next.ref) {
      BASE_TEXT_INPUT_CONTROLLER.next.ref.focus();
    } else {
      currentRef?.current?.blur();
    }

    onSubmitFromProps?.();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderWidth: interpolate(focused.value, [0, 1], [1, 2]),
      borderColor: interpolateColor(
        focused.value,
        [0, 1],
        error
          ? [colors[theme].error, colors[theme].error]
          : [colors[theme].text.secondary, colors[theme].text.primary],
      ),
    };
  });

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={[styles.border, animatedStyle]} />
      <TextInputComponent
        ref={forwardRef as any}
        style={styles.text}
        placeholder={placeholder}
        cursorColor={colors[theme].text.primary}
        placeholderTextColor={colors[theme].text.secondary}
        selectionColor={colors[theme].text.primary}
        returnKeyType={
          inputType === 'email'
            ? 'next'
            : inputType === 'password'
            ? 'done'
            : 'default'
        }
        onFocus={onFocus}
        onBlur={onBlur}
        onSubmitEditing={onSubmit}
        onChangeText={onChangeText}
        blurOnSubmit={false}
        autoComplete={'off'}
        autoCorrect={false}
        secureTextEntry={inputType === 'password' ? secure : false}
        autoCapitalize={'none'}
      />
      {disableSecure ? undefined : inputType === 'password' ? (
        <TouchableOpacity
          style={styles.icon}
          activeOpacity={ACTIVE_OPACITY}
          onPress={onSecurePress}>
          <SecureSvg width={16} height={16} fill={colors[theme].text.primary} />
        </TouchableOpacity>
      ) : undefined}
    </Animated.View>
  );
};

export default BaseTextInput;
