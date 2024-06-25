import Animated, {
  SharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';
import { TextInput, TextInputProps } from 'react-native';
import React from 'react';

const ReanimatedTextInput = Animated.createAnimatedComponent(TextInput);

type BaseAnimatedTextProps = {
  text: SharedValue<string | number>;
};

const BaseAnimatedText: React.FC<TextInputProps & BaseAnimatedTextProps> = ({
  text,
  ...textInputProps
}) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value.toString(),
    };
  });

  return (
    <ReanimatedTextInput
      pointerEvents={'none'}
      value={text.value.toString()}
      placeholder={text.value.toString()}
      animatedProps={animatedProps as any}
      {...textInputProps}
    />
  );
};

export default BaseAnimatedText;
