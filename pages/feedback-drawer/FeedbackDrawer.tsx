import React from "react";
import { useBaseBrowser, useBaseAspect, useBaseAnalytics } from "@hooks";
import { aspectStyle } from "./aspect";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { PageProps } from "templates/utils";
import Drawer from "templates/drawer/Drawer";
import { Analytics, NAVIGATION_CONTROLLER, Vortex } from "@services";
import LottieView from "lottie-react-native";
import { BaseText } from "components/base/base-text/BaseText";
import { View } from "react-native";
import { BasePrimaryButton } from "components/base/base-primary-button/BasePrimaryButton";
import { BaseSecondaryButton } from "components/base/base-secondary-button/BaseSecondaryButton";

export interface FeedbackDrawerProps {}

const CHAT_LOTTIE = require("resources/animations/chat.json");

const HELP_FORM = "https://forms.gle/Qj8rL8ZGSsBtnTxX8";

const FeedbackDrawer: React.FC<FeedbackDrawerProps & PageProps> = ({}) => {
  const { styles } = useBaseAspect(aspectStyle);

  const lottieRef = React.useRef<LottieView>(null);

  const { openLink } = useBaseBrowser();

  const onClose = (onFinish?: () => void) => {
    NAVIGATION_CONTROLLER.close(onFinish);
  };

  const onScheduleMeeting = () => {
    Analytics.log(
      "tapElement",
      { location: "feedback-drawer", element: "schedule-meeting" },
      ["amplitude"]
    );
    Vortex.dispatch("user-vortex", "changeFeedback")(true, true);
    openLink("https://calendly.com/[application]/30min");
  };

  const onShareThoughts = () => {
    Analytics.log(
      "tapElement",
      { location: "feedback-drawer", element: "share-thoughts" },
      ["amplitude"]
    );
    Vortex.dispatch("user-vortex", "changeFeedback")(true, true);
    openLink(HELP_FORM);
  };

  React.useEffect(() => {
    Vortex.dispatch("user-vortex", "changeFeedback")(true);
  }, []);

  useBaseAnalytics({ page: "feedback-drawer" });

  return (
    <Drawer
      onClose={onClose}
      bottomSheetProps={{
        backgroundStyle: styles.modalStyle,
        onClose: onClose,
        enablePanDownToClose: true,
      }}
    >
      <BottomSheetScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={false}
      >
        <LottieView
          source={CHAT_LOTTIE}
          ref={lottieRef}
          loop
          autoPlay
          hardwareAccelerationAndroid
          resizeMode={"cover"}
          style={styles.lottie}
        />
        <BaseText type={"texturina-34-bold"} style={styles.text}>
          {"Let’s talk!"}
        </BaseText>
        <View style={{ marginVertical: 32 }}>
          <BaseText
            type={"texturina-16-regular"}
            style={styles.text}
          >{`Want to be a funding member of [application]?\nShare your feedback & thoughts in a\nquick call. You’ll receive:`}</BaseText>
          <View style={{ marginTop: 24 }}>
            <BaseText type={"texturina-20-regular"} style={styles.text}>
              <BaseText
                type={"texturina-18-bold"}
              >{`5 years of [application]+`}</BaseText>
              {` (value `}
              <BaseText type={"texturina-18-bold"}>{`$100`}</BaseText>
              {`)\nGood karma 🍀 & our thanks 🙏`}
            </BaseText>
          </View>
        </View>
        <BasePrimaryButton
          title={"Schedule a call & get [application]+"}
          onPress={onScheduleMeeting}
          containerStyle={{ paddingHorizontal: 16 }}
        />
        <BaseSecondaryButton
          title={"Share your thoughts in writing 🎁"}
          titleStyle={styles.secondaryButton}
          onPress={onShareThoughts}
        />
      </BottomSheetScrollView>
    </Drawer>
  );
};

export default FeedbackDrawer;
