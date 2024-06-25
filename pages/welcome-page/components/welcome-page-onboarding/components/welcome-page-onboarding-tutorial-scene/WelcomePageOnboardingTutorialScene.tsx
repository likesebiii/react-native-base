import React from "react";
import { View } from "react-native";
import { useBaseForwardRef, useBaseStateAndRef, useBaseAspect } from "@hooks";
import { aspectStyle } from "./aspect";
import TopicPageWrapper from "pages/topic-page/TopicPage";
import {
  LIVES_LIMIT,
  TOPIC_CONTENT_INFORMATION,
  TOPIC_CONTENT_QUESTIONS,
  getQuestionFromInterests,
  entering,
} from "@utils";
import FeedBottomBar from "pages/feed-page/components/feed-bottom-bar/FeedBottomBar";

import Animated, { FadeIn } from "react-native-reanimated";
import WelcomePageOnboardingBottomButton from "../welcome-page-onboarding-bottom-button/WelcomePageOnboardingBottomButton";
import LottieView from "lottie-react-native";
import { BaseText } from "components/base/base-text/BaseText";
import { Analytics, useSelectVortex, Vortex } from "@services";
import WelcomePageHandLottie, {
  WelcomePageHandLottieProps,
  WelcomePageHandLottieRef,
} from "pages/welcome-page/components/welcome-page-hand-lottie/WelcomePageHandLottie";
import StreakCalendarWeek from "components/streak/streak-calendar-week/StreakCalendarWeek";

type WelcomePageOnboardingTutorialSceneProps = {
  onContinue?: () => void;
};

const STREAK_LOTTIE = require("resources/animations/streak.json");

const WelcomePageOnboardingTutorialScene: React.FC<
  WelcomePageOnboardingTutorialSceneProps
> = ({ onContinue }) => {
  const { styles } = useBaseAspect(aspectStyle);

  const [step, setStep, stepRef] = useBaseStateAndRef(0);
  const [type, setType] = React.useState<"normal" | "streak">("normal");

  const [handRef, handForwardRef] =
    useBaseForwardRef<WelcomePageHandLottieRef>();

  const onTapStart = () => {
    handRef.current?.animate("stop");
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = undefined;
    }
  };

  const timer = React.useRef<NodeJS.Timeout>();

  const lottieRef = React.useRef<LottieView>(null);

  const interests =
    useSelectVortex("user-vortex", (object) => object.onboarding.topics) ?? [];
  const content = React.useMemo(() => {
    return [
      TOPIC_CONTENT_INFORMATION[147],
      TOPIC_CONTENT_QUESTIONS[-2],
      TOPIC_CONTENT_INFORMATION[148],
      TOPIC_CONTENT_INFORMATION[150],
      ...getQuestionFromInterests({ interests, disableCollected: true }),
      TOPIC_CONTENT_QUESTIONS[-1],
    ];
  }, [interests]);

  const onSwipe = () => {
    const newStep = stepRef.current + 1;

    setStep(stepRef.current + 1);

    if (newStep === 1 || newStep === 3) {
      timer.current = setTimeout(() => {
        handRef.current?.animate("start");
      }, 1000);
    } else {
      clearTimeout(timer.current);
      timer.current = undefined;
    }

    if (newStep === 1) {
      Analytics.log(
        "onboardingContinueStep",
        { type: "tutorial", action: "add-lives" },
        ["amplitude"]
      );
      Vortex.dispatch("user-vortex", "setUserLives")(LIVES_LIMIT.free, true);
    } else if (newStep === content.length - 2) {
      setTimeout(() => {
        Vortex.dispatch("user-vortex", "setUserStreak")(1);
        setType("streak");
      }, 2000);
      Analytics.log(
        "onboardingContinueStep",
        { type: "tutorial", action: "streak-modal" },
        ["amplitude"]
      );
    } else if (newStep === content.length - 1) {
      Analytics.log(
        "onboardingContinueStep",
        { type: "tutorial", action: "continue" },
        ["amplitude"]
      );
      setTimeout(() => {
        onContinue?.();
      }, 2000);
    }
  };

  const onAnswer = (correct: boolean, answer: string) => {
    if (stepRef.current === 1) {
      Vortex.dispatch(
        "user-vortex",
        "changeOnboardingProps"
      )({ canYouHandle: answer });
      Analytics.log(
        "onboardingContinueStep",
        { type: "tutorial", canYouHandle: answer },
        ["amplitude"]
      );
    } else if (stepRef.current === content.length - 3) {
      Vortex.dispatch(
        "user-vortex",
        "changeOnboardingProps"
      )({ correctAnswer: correct });
      Analytics.log(
        "onboardingContinueStep",
        { type: "tutorial", correctAnswer: correct },
        ["amplitude"]
      );
    }
  };

  const onSwipeDown = () => {
    Vortex.dispatch(
      "user-vortex",
      "changeOnboardingProps"
    )({ downGesture: true });
  };

  React.useEffect(() => {
    Analytics.log("onboardingContinueStep", { type: "tutorial" }, [
      "amplitude",
    ]);
  }, []);

  const handProps = (
    step == 0
      ? { type: "horizontal", direction: "left-right" }
      : { type: "vertical", direction: "down" }
  ) as WelcomePageHandLottieProps;

  return (
    <View style={styles.container}>
      <TopicPageWrapper
        difficulty={1}
        style={styles.removeBackground}
        onSwipe={onSwipe}
        topic={step < 4 ? "welcome" : "history"}
        contentFromProps={content}
        disableTopBar
        disableStreakBar={step > 1 ? false : true}
        enableVerticalSwipe={step > 2 && step < 4 ? true : false}
        onAnswer={onAnswer}
        onSwipeDown={onSwipeDown}
        disableHorizontalGestures={step === 3}
        disableUpGesture={step === 3}
        disableLivesBlocking
        disableAnalytics
        disableTopbarTap
        lastCardEnabled={false}
        onTapStart={onTapStart}
      >
        {step === 0 || step === 3 ? (
          <WelcomePageHandLottie ref={handForwardRef} {...handProps} />
        ) : undefined}
        {step === 3 ? <FeedBottomBar bottomInset={12} /> : undefined}
      </TopicPageWrapper>
      {type === "streak" ? (
        <Animated.View
          style={styles.bottomContainer}
          entering={entering}
          key={`welcome-page-onboarding-tutorial-scene-${type}`}
        >
          <View style={{ width: "100%", alignItems: "center" }}>
            <LottieView
              source={STREAK_LOTTIE}
              ref={lottieRef}
              loop
              autoPlay
              hardwareAccelerationAndroid
              resizeMode={"cover"}
              style={styles.lottie}
            />
            <BaseText
              type={"texturina-40-semi-bold"}
              style={styles.streakTitle}
            >
              {"Streak Unlocked!"}
            </BaseText>
          </View>
          <WelcomePageOnboardingBottomButton
            onPress={onContinue}
            topTitle={
              "Learn something new daily with [application] and keep your streak going."
            }
            title={"Continue"}
            textStyle={styles.button}
          />
          <View style={styles.calendarContainer}>
            <Animated.View
              style={styles.calendar}
              entering={FadeIn.delay(1000)}
            >
              <StreakCalendarWeek />
            </Animated.View>
          </View>
        </Animated.View>
      ) : undefined}
    </View>
  );
};

export default WelcomePageOnboardingTutorialScene;
