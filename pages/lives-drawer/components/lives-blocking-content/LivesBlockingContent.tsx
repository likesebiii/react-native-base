import React from "react";
import { View } from "react-native";
import { useBaseAspect } from "@hooks";
import { aspectStyle } from "./aspect";
import { LivesEmptySvg } from "@svgs";
import { LIVES_TIMEOUT } from "@utils";
import { BaseText } from "components/base/base-text/BaseText";
import LivesCounter from "../lives-counter/LivesCounter";
import { BasePrimaryButton } from "components/base/base-primary-button/BasePrimaryButton";
import { PUSH_NOTIFICATIONS_CONTROLLER } from "utils/notifications";
import { NAVIGATION_CONTROLLER } from "services/navigation";
import { Analytics, useSelectVortex, Vortex } from "@services";
import BaseDivider from "components/base/base-divider/BaseDivider";
import { BaseSecondaryButton } from "components/base/base-secondary-button/BaseSecondaryButton";
import { Toast } from "react-native-toast-message/lib/src/Toast";

type LivesBlockingContentProps = {
  date: string;
  lives: number;
};

const LivesBlockingContent: React.FC<LivesBlockingContentProps> = ({
  date,
  lives,
}) => {
  const { styles, screenWidth } = useBaseAspect(aspectStyle);

  const isPro = useSelectVortex("user-vortex", "selectUserSubscriptionType");

  const onNotifyMe = () => {
    Analytics.log(
      "tapElement",
      { location: "lives-drawer", element: "notify-me" },
      ["amplitude"]
    );

    const onSuccess = () => {
      if (Vortex.getObject("user-vortex").lives.notification) {
        Toast.show({
          type: "success",
          text1: "Stay Tuned!",
          text2: "Notification approaching.",
          swipeable: false,
        });
      } else {
        Toast.show({
          type: "success",
          text1: "Stay Tuned!",
          text2: "Notification approaching.",
          swipeable: false,
        });
        PUSH_NOTIFICATIONS_CONTROLLER.triggerLifeNotification();
        Vortex.dispatch("user-vortex", "setUserLifeNotification")(true);
      }
    };

    NAVIGATION_CONTROLLER.close(onSuccess);
  };

  const onGetMoreLives = () => {
    Analytics.log(
      "tapElement",
      { location: "lives-drawer-blocking", element: "get-more-lives" },
      ["amplitude"]
    );

    const onSuccess = () => {
      NAVIGATION_CONTROLLER.navigate("fk.PaywallPage", {
        location: "lives-drawer-blocking",
      });
    };

    NAVIGATION_CONTROLLER.close(onSuccess);
  };

  const onGetInTouch = () => {
    Analytics.log(
      "tapElement",
      { location: "lives-drawer-blocking", element: "get-in-touch" },
      ["amplitude"]
    );

    const onSuccess = () => {
      NAVIGATION_CONTROLLER.navigate("fk.FeedbackDrawer", {});
    };

    NAVIGATION_CONTROLLER.close(onSuccess);
  };

  const timeCount = Math.round(
    LIVES_TIMEOUT[isPro] / 60 / (isPro === "pro" ? 1 : 60)
  );

  return (
    <>
      <View style={styles.subtitleContainer}>
        <BaseText style={styles.error} type={"texturina-34-bold"}>
          {"Oh no..."}
        </BaseText>
        <BaseText style={styles.error} type={"texturina-20-regular"}>
          {"You’ve ran out of lives"}
        </BaseText>
        <View style={styles.livesEmpty}>
          <LivesEmptySvg height={screenWidth * 0.3} width={screenWidth * 0.3} />
        </View>
        <LivesCounter
          lives={lives}
          date={new Date(
            new Date(date + "Z").getTime() + 1000 * LIVES_TIMEOUT[isPro]
          )
            .toISOString()
            .slice(0, -1)}
          style={styles.lives}
        />
      </View>
      <View>
        <BaseDivider />
        <View style={styles.marginTop}>
          <BaseText style={styles.text} type={"texturina-20-regular"}>
            {
              "Don’t feel like waiting?\nElevate your experience by upgrading to"
            }
            <BaseText type={"texturina-18-bold"}>{" [application]+ "}</BaseText>
            {"for "}
            <BaseText type={"texturina-18-bold"}>{"expanded limits."}</BaseText>
          </BaseText>
        </View>
        <View style={styles.marginTop}>
          <BasePrimaryButton
            title={isPro === "pro" ? "Get in touch" : "Get more lives now"}
            onPress={isPro === "pro" ? onGetInTouch : onGetMoreLives}
          />
        </View>
        <BaseSecondaryButton
          style={styles.notify}
          title={`Notify me in ${timeCount} ${
            isPro === "pro" ? "minute" : "hour"
          }${timeCount === 1 ? "" : "s"}`}
          onPress={onNotifyMe}
        />
      </View>
    </>
  );
};

export default LivesBlockingContent;
