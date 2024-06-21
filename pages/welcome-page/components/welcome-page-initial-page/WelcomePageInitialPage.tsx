import React from "react";
import { View } from "react-native";
import { useBaseStateAndRef, useBaseAspect } from "@hooks";
import { aspectStyle } from "./aspect";
import { BaseText } from "components/base/base-text/BaseText";
import { BasePrimaryButton } from "components/base/base-primary-button/BasePrimaryButton";
import WelcomePageCarousel from "../welcome-page-carousel/WelcomePageCarousel";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { BasePressableScale } from "components/base/base-pressable-scale/BasePressableScale";
import { NAVIGATION_CONTROLLER } from "services/navigation";

type WelcomePageInitialPageProps = {
  onOnboardingStart?: () => void;
  continueElement?: boolean;
};

const WelcomePageInitialPage: React.FC<WelcomePageInitialPageProps> = ({
  onOnboardingStart,
  continueElement = false,
}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const welcomeScene = useSharedValue(0);
  const [welcomeSceneState, setWelcomeSceneState, welcomeSceneStateRef] =
    useBaseStateAndRef(0);

  const onContinuePress = () => {
    if (!continueElement) {
      onOnboardingStart?.();
    } else {
      if (welcomeSceneStateRef.current !== 2) {
        welcomeScene.value = withTiming(welcomeScene.value + 1);
        setWelcomeSceneState(welcomeSceneStateRef.current + 1);
      } else {
        onOnboardingStart?.();
      }
    }
  };

  const onScroll = (index: number) => {
    if (index !== welcomeSceneStateRef.current) {
      welcomeScene.value = withTiming(index);
      setWelcomeSceneState(index);
    }
  };

  const onAccountPress = () => {
    NAVIGATION_CONTROLLER.navigate("fk.AuthenticateDrawer", {});
  };

  return (
    <>
      <BaseText
        style={styles.title}
        type={"jockey-40"}
        maxFontSizeMultiplier={1}
      >
        {"[application]"}
      </BaseText>
      <WelcomePageCarousel
        onScroll={onScroll}
        welcomeScene={welcomeScene}
        welcomeSceneState={welcomeSceneState}
      />
      <View style={styles.bottomContainer}>
        <BasePrimaryButton
          containerStyle={styles.button}
          title={"Continue"}
          onPress={onContinuePress}
        />
        <BasePressableScale onPress={onAccountPress}>
          <BaseText
            style={styles.bottomText}
            type={"texturina-16-semi-bold"}
            maxFontSizeMultiplier={1.15}
          >
            {"I have an account"}
          </BaseText>
        </BasePressableScale>
      </View>
    </>
  );
};

export default WelcomePageInitialPage;
