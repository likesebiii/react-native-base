import React from "react";
import { View } from "react-native";
import { useBaseAspect } from "@hooks";
import { aspectStyle } from "./aspect";
import { BasePressableScale } from "components/base/base-pressable-scale/BasePressableScale";
import { CloseSvg } from "@svgs";
import WelcomePageOnboardingTitle from "pages/welcome-page/components/welcome-page-onboarding/components/welcome-page-onboarding-title/WelcomePageOnboardingTitle";
import { BaseImage } from "components/base/base-image/BaseImage";
import { BaseText } from "components/base/base-text/BaseText";
import PaywallButton from "../paywall-button/PaywallButton";

type PaywallSuccessProps = {
  onClose?: () => void;
};

const GIFT_IMAGE = require("resources/assets/gift.png");

const PaywallSuccess: React.FC<PaywallSuccessProps> = ({ onClose }) => {
  const { styles } = useBaseAspect(aspectStyle);

  return (
    <>
      <View style={styles.welcomeHeader} pointerEvents={"box-none"}>
        <WelcomePageOnboardingTitle
          title={"Activation Successful"}
          subtitle={`Thank you for being an early [application] supporter.`}
          disableStep
          disableIllustration
          illustrationType={"present"}
        />
      </View>
      <View style={styles.header}>
        <BasePressableScale onPress={onClose}>
          <CloseSvg height={24} />
        </BasePressableScale>
      </View>
      <View style={styles.center}>
        <BaseImage
          source={GIFT_IMAGE}
          style={styles.image}
          resizeMode={"contain"}
        />
        <BaseText style={styles.successText} type={"texturina-20-regular"}>
          {`Thank you for being a foundational supporter of our app.\nAs part of our commitment to our early users like you, we're striving to enhance your experience with our`}
          <BaseText type={"texturina-18-bold"}>{`\n[application]+`}</BaseText>
          {" subscription."}
        </BaseText>
      </View>
      <PaywallButton
        title={"Continue"}
        onPress={onClose}
        disableSecured
        disableTopText
      />
    </>
  );
};

export default PaywallSuccess;
